import { CONNECTION_STATES, DEFAULT_HOST, DEFAULT_NAME } from '@/consts'

export const connection = {
  namespaced: true,
  state: {
    wasConnected: false,
    elasticsearchHost: null, // deprecated
    activeInstanceIdx: -1,
    instances: [],
    elasticsearchAdapter: null
  },
  mutations: {
    setConnected (state) {
      state.wasConnected = true
    },
    setElasticsearchHost (state, host) {
      state.elasticsearchHost = host
    },
    setElasticsearchAdapter (state, adapter) {
      state.elasticsearchAdapter = adapter
    },
    addElasticsearchInstance (state, instance) {
      state.instances.push(instance)
    },
    removeInstance (state, index) {
      state.instances.splice(index, 1)
      if (index === state.activeInstanceIdx) {
        state.activeInstanceIdx = 0
      } else if (index < state.activeInstanceIdx) {
        state.activeInstanceIdx = state.activeInstanceIdx - 1
      }
      if (state.instances.length === 0) {
        state.instances.push({ name: DEFAULT_NAME, uri: DEFAULT_HOST, status: CONNECTION_STATES.UNKNOWN })
      }
    },
    setActiveInstanceIdx (state, index) {
      state.activeInstanceIdx = index
      state.elasticsearchAdapter = null
    }
  },
  getters: {
    activeInstance: state => {
      return state.instances[state.activeInstanceIdx]
    }
  }
}
