import RNProgressHud from 'progress-hud'
const ProgressHUDMaskType: any = RNProgressHud.ProgressHUDMaskType

export const onGlobalLoading = (title: string = 'ローディング...') =>
  RNProgressHud.showWithStatus(title, ProgressHUDMaskType.Clear)

export const onStatusGlobalLoading = (percent: number) =>
  RNProgressHud.showProgressWithStatus(percent, 'Downloading ...', ProgressHUDMaskType.Clear)

export const onShowSuccessWithStatus = (title: string) =>
  RNProgressHud.showSuccessWithStatus(title, ProgressHUDMaskType.Clear)

export const offGlobalLoading = () => RNProgressHud.dismiss()

export const onGlobalLoadingCommon = () => {
  RNProgressHud.show()
}
