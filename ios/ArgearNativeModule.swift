

import Foundation

@objc(ArgearNativeModule)
class ArgearNativeModule : NSObject {
  
  var bridge: RCTBridge!
  
  //Đối với swift 3.0 cần có dấu "_" vào trước tham số function
  @objc func greetUser(_ name: String, isAdmin: Bool, callback: RCTResponseSenderBlock) -> Void {
    
    NSLog("User Name: %@ , Administrator: %@", name, isAdmin ? "Yes" : "No");
    let greeting = "Welcome \(name), you \(isAdmin ? "are" : "are not") an administrator"
    callback([greeting]);
  }
  
  @objc func greetUserWithPromises(
    name: String,
    isAdmin: Bool,
    resolver: RCTPromiseResolveBlock,
    rejecter: RCTPromiseRejectBlock) -> Void {
    
    NSLog("User Name: %@ , Administrator: %@", name, isAdmin ? "Yes" : "No");
    let greeting = "Welcome \(name), you \(isAdmin ? "are" : "are not") an administrator"
    resolver([greeting]);
  }
  
  @objc func greetUserWithEvent(name: String, isAdmin: Bool) {
    NSLog("User Name: %@ , Administrator: %@", name, isAdmin ? "Yes" : "No");
    let greeting = "Welcome \(name), you \(isAdmin ? "are" : "are not") an administrator"
    
    self.bridge.eventDispatcher().sendAppEvent(withName: "GreetingResponse", body: ["greeting":greeting])
  }
}
