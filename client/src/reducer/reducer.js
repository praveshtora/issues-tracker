import { serverUrl } from '../constants';
export const ADD_ISSUE = 'ADD_ISSUE';
export const REORDER_ISSUE = 'REORDER_ISSUE';

export const reducer = async (state = { lifeCycles: {} }, action) => {
  switch (action.type) {
    case ADD_ISSUE: {
      const { payload } = action;

      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.success) {
        // Display error message : response.message
        return state;
      }

      const { title, description, lifeCycleName } = payload;
      const { lifeCycles } = state;
      const lifeCycleIssues = lifeCycles[lifeCycleName];
      // const lifecycle = Object.entries(lifeCycles).find(([key, value]) => key === lifeCycle);
      return {
        lifeCycles: {
          ...lifeCycles,
          [lifeCycleName]: [
            ...lifeCycleIssues,
            {
              title,
              description
            }
          ]
        }
      };

      // return {
      //   response
      // }
    }
    case REORDER_ISSUE: {
      const { payload } = action;
      return payload;
    }
    default:
      return state;
  }
};

// {
//   lifeCycles: {
//     'To-Do': [],
//     Progress: [
//       {
//         _id: 'id2',
//         issueId: '1003',
//         title: 'Refactor Repo',
//         description: 'Nothing much',
//         asignee: 'Vikalp',
//         lifeCycle: 'Done',
//         comments: ['comment2']
//       }
//     ],
//     Done: [
//       {
//         _id: 'id1',
//         issueId: '1002',
//         title: 'Create Repo',
//         description: 'ASKK askjka asda',
//         asignee: 'Manish',
//         lifeCycle: 'Done',
//         comments: ['comment1']
//       }
//     ]
//   }
// };
