import Vue from 'vue';
import axios from 'axios';
import uuid from 'uuid/v4';
import shortid from 'shortid';
import _ from 'lodash';
import { Record, Map as IMap, List } from 'immutable';

const keyedList = (list = []) => list.map(item => ({
  ...item,
  key: uuid()
}));

export const state = () => ({
  token: '',
  running: false,
  activeFlowIndex: 0,
  flows: [],
  channels: []
});

const TriggerRecord = Record({
  kind: 'word',
  data: IMap()
});

const ActionRecord = Record({
  key: '',
  kind: 'request',
  data: IMap({
    method: 'get'
  })
});

const FinisherRecord = Record({
  kind: 'message',
  data: IMap()
});

const FlowRecord = Record({
  key: '',
  name: '',
  trigger: new TriggerRecord(),
  finisher: new FinisherRecord(),
  actions: List()
});

export const actions = {
  async fetch ({ commit }) {
    const res = await axios.get('/api/bot');
    commit('initialize', res);
  },
  async fetchChannels ({ state, commit }) {
    const res = await axios.get('/api/bot/slack/channels', { params: { token: state.token } });
    commit('updateChannels', res);
  },
  async start ({ state, commit }) {
    await axios.post('/api/bot/slack/start', state);
    commit('start');
  },
  async stop ({ state, commit }) {
    await axios.post('/api/bot/slack/stop', state);
    commit('stop');
  },
  async syncStore ({ state, commit }) {
    await axios.post('/api/bot/slack/sync', state);
  }
};

export const mutations = {
  initialize (state, res = {}) {
    const data = res.data || {};

    const assignData = {
      ...data,
      flows: keyedList(data.flows).map(flow => ({
        ...flow,
        actions: keyedList(flow.actions)
      }))
    };

    Object.assign(state, assignData);
  },
  updateChannels (state, res = {}) {
    state.channels = res.data || [];
  },
  updateFlowIndex (state, indexString) {
    const index = parseInt(indexString, 10);
    if (isNaN(index)) return;
    state.activeFlowIndex = index || 0;
  },
  addFlow (state) {
    state.flows = [...state.flows, new FlowRecord({ key: uuid() }).toJS()];
    state.activeFlowIndex = state.flows.length - 1;
  },
  addAction (state, index) {
    const newAction = new ActionRecord({ key: uuid() }).toJS();
    const prev = state.flows[state.activeFlowIndex].actions;
    state.flows[state.activeFlowIndex].actions = [...prev.slice(0, index), newAction, ...prev.slice(index)];
  },
  generateUrlToken (state) {
    Vue.set(state.flows[state.activeFlowIndex].trigger.data, 'token', shortid());
  },
  deleteFlow (state) {
    const prev = state.flows;
    const index = state.activeFlowIndex;
    state.flows = [...prev.slice(0, index), ...prev.slice(index + 1)];

    if (index >= state.flows.length) {
      const newIndex = index - 1;
      state.activeFlowIndex = newIndex < 0 ? 0 : newIndex;
    }
  },
  deleteAction (state, index) {
    const prev = state.flows[state.activeFlowIndex].actions;
    state.flows[state.activeFlowIndex].actions = [...prev.slice(0, index), ...prev.slice(index + 1)];
  },
  update (state, pathAndValue) {
    let target = state;
    const path = pathAndValue.slice(0, -1);
    const keypath = path.slice(0, -1);

    keypath.forEach(key => {
      target = target[key];
    });

    Vue.set(target, _.last(path), _.last(pathAndValue));
  },
  start (state) {
    state.running = true;
  },
  stop (state) {
    state.running = false;
  }
};
