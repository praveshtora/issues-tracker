import { serverUrl } from '../constants';
export const ADD_NEW_ISSUE = 'ADD_NEW_ISSUE';
export const REORDER_ISSUE = 'REORDER_ISSUE';

const isEmptyObj = obj => Object.keys(obj).length === 0;

export const reducer = (state = { lifeCycles: {} }, action) => {
  switch (action.type) {
    case ADD_NEW_ISSUE: {
      const { payload, boardID } = action;

      const { title, lifeCycleName } = payload;
      const { lifeCycles } = state;

      fetch(serverUrl+'board/issue/add/' + boardID, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      console.log(state)
      console.log('lifeCycles', lifeCycles);
      console.log('lifeCycleName', lifeCycleName);
      const lifeCycleIssues = isEmptyObj(lifeCycles)
        ? []
        : lifeCycles[lifeCycleName];

        console.log("new state", {
          lifeCycles: {
            ...lifeCycles,
            [lifeCycleName]: [
              ...lifeCycleIssues,
              {
                title
              }
            ]
          }
        })
      return {
        lifeCycles: {
          ...lifeCycles,
          [lifeCycleName]: [
            ...lifeCycleIssues,
            {
              title
            }
          ]
        }
      };
    }

    case REORDER_ISSUE: {
      const { payload } = action;
      console.log("loaded new state", { ...payload })
      return { ...payload };
    }
    default:
      return state;
  }
};
