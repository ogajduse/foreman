import API from '../../../API';
import { foremanUrl } from '../../../../foreman_tools';

import {
  STATISTICS_PAGE_DATA_RESOLVED,
  STATISTICS_PAGE_DATA_FAILED,
  STATISTICS_PAGE_HIDE_LOADING,
  STATISTICS_PAGE_URL,
} from '../constants';

export const getStatisticsMeta = (
  url = foremanUrl(STATISTICS_PAGE_URL)
) => async dispatch => {
  const onFetchSuccess = ({ data }) => {
    dispatch(hideLoading());
    dispatch({
      type: STATISTICS_PAGE_DATA_RESOLVED,
      payload: { metadata: data, hasData: data.length > 0 },
    });
  };

  const onFetchError = ({ message }) => {
    dispatch(hideLoading());
    dispatch({
      type: STATISTICS_PAGE_DATA_FAILED,
      payload: {
        message: {
          type: 'error',
          text: message,
        },
      },
    });
  };
  try {
    const response = await API.get(url);
    return onFetchSuccess(response);
  } catch (error) {
    return onFetchError(error);
  }
};

const hideLoading = () => ({
  type: STATISTICS_PAGE_HIDE_LOADING,
});
