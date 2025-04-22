//
//  RNConfig.m
//  NFT_SNAP_APP
//
//  Created by PiPyL on 10/05/2022.
//

#import "RNConfig.h"
#import "BaseProjectRN-Swift.h"

@implementation RNConfig

RCT_EXPORT_MODULE();

-(NSDictionary *)constantsToExport
{
#if  DEV
  NSString *env = @"dev";
#elif STAGING
  NSString *env = @"staging";
#else
  NSString *env = @"prod";
#endif
  return @{@"env": env};
}

RCT_EXPORT_METHOD(disableScreenShot) {
  @try{
    dispatch_sync(dispatch_get_main_queue(), ^{
      ScreenGuardManager *manager = ScreenGuardManager.shared;
      if (UIWindow.key == NULL) {
        return;
      }
      [manager guardScreenshotFor: UIWindow.key];
    });
  }
  @catch(NSException *exception){
    //    callback(@[exception.reason, [NSNull null]]);
  }
}

RCT_EXPORT_METHOD(enableScreenShot){
  @try{
    dispatch_sync(dispatch_get_main_queue(), ^{
      ScreenGuardManager *manager = ScreenGuardManager.shared;
      if (UIWindow.key == NULL) {
        return;
      }
      [manager disableScreenshotProtectionFor: UIWindow.key];
    });
  }
  @catch(NSException *exception){
    //    callback(@[exception.reason, [NSNull null]]);
  }
}

@end
