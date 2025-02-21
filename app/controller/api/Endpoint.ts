import Constant from '../Constant'

const parseParams = (params: { [k: string]: any }) => {
  const keys = Object.keys(params)
  let options = ''

  keys.forEach(key => {
    const isParamTypeObject = typeof params[key] === 'object'
    const isParamTypeArray = isParamTypeObject && params[key].length >= 0
    if (!params[key]) {
      return
    }
    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element: any) => {
        options += `${key}=${element}&`
      })
    }
  })

  return options ? options.slice(0, -1) : options
}

export default () => {
  const baseURL = Constant.baseURL
  return {
    baseURL,
    login: `${baseURL}/login`,
    register: `${baseURL}/register`,
    userProfile: `${baseURL}/user/profile`,
    getPointPackage: `${baseURL}/point-packages`,
    topPage: (params: any) => `${baseURL}/livestream/top-page?${parseParams(params)}`,
    topPageBooking: (params: any) => `${baseURL}/livestream/top-page/booking?${parseParams(params)}`,
    buyPoints: `${baseURL}/payments/buy-point`,
    getListRoom: `${baseURL}/room/list-live`,
    joinRoom: (id: any) => `${baseURL}/room/${id}/join`,
    getListPlan: `${baseURL}/plans?type=${1}`,
    subscriptionPlan: `${baseURL}/subscription/create-subscription`,
    getListMemberships: (params: any) => `${baseURL}/user/memberships?${parseParams(params)}`,
    cancelSubscription: `${baseURL}/subscription/cancel-subscription`,
    musics: (params: any) => `${baseURL}/musics?${parseParams(params)}`,
    detailMusic: (id: number) => `${baseURL}/musics/${id}`,
    buyMusic: (id: number) => `${baseURL}/musics/buy-music/${id}`,
    meeting: (params: any) => `${baseURL}/user/schedules?${parseParams(params)}`,
    stremerProfile: (id: number) => `${baseURL}/streamer/${id}`,
    followStreamer: (params: any) => `${baseURL}/user/follow?${parseParams(params)}`,
    unfollowStreamer: (params: any) => `${baseURL}/user/unfollow?${parseParams(params)}`,
    updateDevice: `${baseURL}/device/update`,
    verifyBillApple: `${baseURL}/apple/verify-bill-subscription`,
    joinMeeting: (id: number) => `${baseURL}/schedules/${id}/join`,
    listFollowings: (params: any) => `${baseURL}/user/followings?${parseParams(params)}`,
    loginGoogle: `${baseURL}/login-social/google`,
    loginApple: `${baseURL}/login-social/apple`,
    loginLine: `${baseURL}/login-social/line`,
    loginFacebook: `${baseURL}/login-social/facebook`,
    scheduleCalendar: (id: number, params: any) => `${baseURL}/streamer/${id}/calendar?${parseParams(params)}`,
    notificationList: (params: any) => `${baseURL}/notifications?${parseParams(params)}`,
    getCodeVerify: `${baseURL}/auth`,
    updateProfile: `${baseURL}/auth/update-profile`,
    getListArchive: (id: number, params: any) => `${baseURL}/streamer/${id}/archive?${parseParams(params)}`,
    events: (params: any) => `${baseURL}/events?${parseParams(params)}`,
    detailEvent: (id: number, params: any) => `${baseURL}/events/${id}?${parseParams(params)}`,
    bookSchedule: (id: number) => `${baseURL}/schedules/${id}/book`,
    searchWithKeyword: (params: any) => `${baseURL}/search/keyword?${parseParams(params)}`,
    searchCategory: (params: any) => `${baseURL}/search/category?${parseParams(params)}`,
    searchHistory: `${baseURL}/search/histories`,
    deleteSearchRecent: (id: number) => `${baseURL}/search/histories/${id}`,
    historyPayment: (params: any) => `${baseURL}/payments/histories?${parseParams(params)}`,
    rankUser: (params: any) => `${baseURL}/user/ranking-streamer?${parseParams(params)}`,
    getListMessage: (params: any) => `${baseURL}/messages?${parseParams(params)}`,
    updateMessage: (id: number) => `${baseURL}/messages/${id}/update`,
    createRoomChat: `${baseURL}/messages/create-room`,
    getPaymentExistingCard: `${baseURL}/payments/get-payment-methods`,
    buyPointsOldCard: `${baseURL}/payments/buy-point-old-card`,
    uploadMessageFile: (id: number) => `${baseURL}/messages/${id}/upload`,
    getListFollowing: `${baseURL}/user/followings`,
    settingNotice: `${baseURL}/user/setting-notice`,
    deleteAccount: `${baseURL}/user/delete-account`,
    ads: `${baseURL}/ads-setting`,
    rankingDaily: (params: any) => `${baseURL}/user/ranking-streamer-daily?${parseParams(params)}`,
    rankingWeekly: (params: any) => `${baseURL}/user/ranking-streamer-weekly?${parseParams(params)}`,
    rankingMonthly: (params: any) => `${baseURL}/user/ranking-streamer-monthly?${parseParams(params)}`,
  }
}
