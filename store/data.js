export const state = () => ({
  lang: 'es'
})
export const mutations = {
  SET_LANG(state, payload) {
    state.lang = payload
  }
}
