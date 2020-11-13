import { APP_CONSTANTS } from '../actions/costants/app-constant';

const initialState = {
  isShownModal: false
}

export default (state = initialState, {type, payload}) => {
    const newState = {...state}
    switch(type) {
      case APP_CONSTANTS.SHOW_MODAL_PROCESS: {
        return {
          ...newState,
          isShownModal: true
        }
      }
      case APP_CONSTANTS.CLOSE_MODAL_PROCESS: {
        return {
          ...newState,
          isShownModal: false
        }
      }
        default: {
			return newState
		}
    }
}