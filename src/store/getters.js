import moment from 'moment';

import types from '@/store/types';

moment.locale('es');

export default {
  [types.getters.MEMBERS]: (state) => {
    return [...(
      state.selectedTeam
        ? state.remote.members
        : []
    )]
      .sort((a,b) => moment(a.birthday, 'DD/MM').format('YYYYMMDD') - moment(b.birthday, 'DD/MM').format('YYYYMMDD'));
  },
  [types.getters.CEREMONIES]: (state) => {
    const allCeremonies = [
      ...(
        state.selectedTeam
          ? state.remote.teams.find(x => x.id === state.selectedTeam).ceremonies
          : []
      ),
      ...(
        state.selectedTeam
          ? state.remote.globalCeremonies
          : []
      ),
    ]
      // .filter(x => x.periodicity === 'DAYS_AT_WEEK' && x.periodicity_payload.includes(state.selectedDate.weekday()));
      .filter(x => x.periodicity === 'DAYS_AT_WEEK');
    return allCeremonies
      .map(x => ({
        ...x,
        participants: state.remote.members.filter(y => x.participants.includes(y.id))
      }));
  },
  [types.getters.COLORS]: (state) => {
    const { color } = state.remote.teams.find(x => x.id === state.selectedTeam);
    const shadeColor = (c, p) => {
      let r = parseInt(c.substring(1, 3), 16);
      let g = parseInt(c.substring(3, 5), 16);
      let b = parseInt(c.substring(5, 7), 16);
      r = parseInt(r * (100 + p) / 100);
      g = parseInt(g * (100 + p) / 100);
      b = parseInt(b * (100 + p) / 100);
      r = Math.min(255, r);
      g = Math.min(255, g);
      b = Math.min(255, b);
      const RR = `${r.toString(16).length == 1 ? '0' : ''}${r.toString(16)}`;
      const GG = `${g.toString(16).length == 1 ? '0' : ''}${g.toString(16)}`;
      const BB = `${b.toString(16).length == 1 ? '0' : ''}${b.toString(16)}`;
      return `#${RR}${GG}${BB}`;
    };
    return {
      primary: shadeColor(color, 0),
      light10: shadeColor(color, 5),
      light20: shadeColor(color, 10),
      light30: shadeColor(color, 130),
      light70: shadeColor(color, 150),
      dark10: shadeColor(color, -5),
      dark20: shadeColor(color, -10),
      dark30: shadeColor(color, -15),
    };
  },
  [types.getters.MONTH]: (state) => {
    return [...(
      state.selectedTeam
        ? state.remote.teams.find(x => x.id === state.selectedTeam).month
        : []
    )];
  },
};
