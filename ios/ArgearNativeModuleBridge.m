
#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import <React/RCTEventEmitter.h>

//@interface RCT_EXTERN_MODULE(ArgearNativeModule, NSObject)
@interface RCT_EXTERN_MODULE(RNEventEmitter, RCTEventEmitter)

RCT_EXTERN_METHOD(greetUser: (NSString *)name isAdmin:(BOOL *)isAdmin callback:(RCTResponseSenderBlock)callback);

RCT_EXTERN_METHOD(greetUserWithPromises: (NSString *)name isAdmin:(BOOL *)isAdmin resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter);

RCT_EXTERN_METHOD(greetUserWithEvent: (NSString *)name isAdmin:(BOOL *)isAdmin);

RCT_EXTERN_METHOD(supportedEvents)

@end
