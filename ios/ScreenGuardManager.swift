//
//  ScreenCaptureProtector.swift
//  ScreenGuard
//
//  Created by devCracker on 22/04/21.
//

import Foundation
import UIKit

private extension UIView {
  
  struct Constants {
    static var texfieldTag: Int { Int.max }
  }
  
  func setScreenCaptureProtection() {
    if AppDataSingleton.shared.guardTextField == nil {
      let guardTextField = UITextField()
      guardTextField.backgroundColor = .white
      guardTextField.translatesAutoresizingMaskIntoConstraints = false
      guardTextField.tag = Constants.texfieldTag
      guardTextField.isSecureTextEntry = true
      
      //      addSubview(guardTextField)
      guardTextField.isUserInteractionEnabled = false
      //      sendSubviewToBack(guardTextField)
      
      layer.superlayer?.addSublayer(guardTextField.layer)
      guardTextField.layer.sublayers?.first?.addSublayer(layer)
      
      guardTextField.frame = CGRect(x: 0, y: 0, width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height)
      
      AppDataSingleton.shared.guardTextField = guardTextField
      self.frame = CGRect(x: 0, y: 0, width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height)
    } else {
      AppDataSingleton.shared.guardTextField?.backgroundColor = .white
      AppDataSingleton.shared.guardTextField?.isSecureTextEntry = true
    }
  }
  
  // These remove method are only for demo purpose, didnt even test it...
  
  func removeGuardTextView() {
    AppDataSingleton.shared.guardTextField?.isSecureTextEntry = false
    AppDataSingleton.shared.guardTextField?.backgroundColor = .clear
  }
}

public protocol ScreenRecordDelegate {
  func screen(_ screen: UIScreen, didRecordStarted isRecording: Bool)
  func screen(_ screen: UIScreen, didRecordEnded isRecording: Bool)
}

public class ScreenGuardManager: NSObject {
  
  // MARK: Shared
  
  @objc public static let shared = ScreenGuardManager()
  public var screenRecordDelegate: ScreenRecordDelegate?
  private var recordingObservation: NSKeyValueObservation?
  
  // MARK: Init
  
  private override init() { }
  
  // MARK: Functions
  
  @objc public func guardScreenshot(`for` window: UIWindow) {
    window.setScreenCaptureProtection()
  }
  
  @objc public func guardViewScreenshot(`for` view: UIView) {
    view.setScreenCaptureProtection()
  }
  
  // These disable methods are only for demo purpose...
  
  @objc public func disableScreenshotProtection(`for` window: UIWindow) {
    window.removeGuardTextView()
  }
  
  public func disableScreenshotProtection(`for` view: UIView) {
    view.removeGuardTextView()
  }
  
  public func listenForScreenRecord() {
    recordingObservation =  UIScreen.main.observe(\UIScreen.isCaptured, options: [.new]) { [weak self] screen, change in
      let isRecording = change.newValue ?? false
      
      if isRecording {
        self?.screenRecordDelegate?.screen(screen, didRecordStarted: isRecording)
      } else {
        self?.screenRecordDelegate?.screen(screen, didRecordEnded: isRecording)
      }
    }
  }
  
  // MARK: Deinit
  
  deinit {
    screenRecordDelegate = nil
  }
  
}

extension UIWindow {
  @objc static var key: UIWindow? {
    if #available(iOS 13, *) {
      if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
         let window = windowScene.windows.first {
        return window
      }
    }
    return UIApplication.shared.keyWindow
    //    if #available(iOS 13, *) {
    //      return UIApplication.shared.windows.first { $0.isKeyWindow }
    //    } else {
    //      return UIApplication.shared.keyWindow
    //    }
  }
}

