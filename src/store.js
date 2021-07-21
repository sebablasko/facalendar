export default {
    settings: {
          teams: [
            {
              id: 'principal',
              name: 'Principal Advice',
              ceremonies: [
                {
                  name: 'Daily',
                  participants: ['max', 'blasco', 'rozas', 'mati', 'charles', 'mauro', 'gerardo'],
                  periodicity: 'DAYS_AT_WEEK',
                  periodicity_payload: [0, 1, 2, 3, 4],
                },
                {
                  name: 'Refinamiento',
                  participants: ['max', 'blasco', 'mati', 'mauro'],
                  periodicity: 'DAYS_AT_WEEK',
                  periodicity_payload: [2],
                },
              ],
            },
            {
              id: 'cuprum',
              name: 'Cuprum Advice',
              ceremonies: [
                {
                  name: 'Daily',
                  participants: ['charlie', 'awero', 'isa', 'gallardo', 'vale'],
                  periodicity: 'DAYS_AT_WEEK',
                  periodicity_payload: [0, 1, 2, 3, 4],
                },
                {
                  name: 'Refinamiento',
                  participants: ['charlie', 'awero', 'isa', 'gallardo', 'vale'],
                  periodicity: 'DAYS_AT_WEEK',
                  periodicity_payload: [2],
                },
              ],
            },
          ],
          globalCeremonies: [
            {
              name: 'Engineering Chapter',
              participants: ['max', 'blasco', 'charlie', 'mati', 'gallardo', 'mauro', 'vale', 'mati'],
              periodicity: 'DAYS_AT_WEEK',
              periodicity_payload: [1],
            },
            {
              name: 'Continous Improvement',
              participants: ['max', 'blasco', 'charlie', 'mati', 'gallardo', 'mauro', 'vale', 'mati'],
              periodicity: 'DAYS_AT_WEEK',
              periodicity_payload: [3],
            },
          ],
    },
};