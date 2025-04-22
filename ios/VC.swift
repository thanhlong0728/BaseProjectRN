//
//  VC.swift
//  DemoModuleRN
//
//  Created by apple on 11/23/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import UIKit

struct Storyboard {
  static let main = "Main"
  static let login = "Login"
  static let profile = "Profile"
  static let home = "Home"
}

extension UIStoryboard {
  @nonobjc class var main: UIStoryboard {
    return UIStoryboard(name: Storyboard.main, bundle: nil)
  }
  @nonobjc class var login: UIStoryboard {
    return UIStoryboard(name: Storyboard.login, bundle: nil)
  }
  @nonobjc class var profile: UIStoryboard {
    return UIStoryboard(name: Storyboard.profile, bundle: nil)
  }
  @nonobjc class var home: UIStoryboard {
    return UIStoryboard(name: Storyboard.home, bundle: nil)
  }
}

@objc(VC)
class VC: NSObject{
  
  let vc = UINavigationController()
  var bridge: RCTBridge!
  var imgPath = ""
  
  //Mở màn hình trong storyboard, chú ý storyboard nằm trong project chính, không nằm trong module
  @objc func openViewControllerInMainStory() -> Void {
//    //Mở màn hình View Controller không có header là navigator
//    //let loginVc = UIStoryboard.main.instantiateViewController(withIdentifier: "ViewVC")
//    //Mở màn hình ViewController có header là navigator
//    let loginVc = UIStoryboard.main.instantiateViewController(withIdentifier: "MainNavigationVC")
//    let rootvc:UIViewController? = UIApplication.shared.delegate?.window??.rootViewController!
//    rootvc?.present(loginVc, animated:true)
    
//    Chỉ mở màn hình mà ViewController
//    let rootvc:UIViewController? = UIApplication.shared.delegate?.window??.rootViewController!
//    let gamevc = GameVC()
//    rootvc?.present(gamevc, animated:true)
    
////     Mở màn hình có NavigationController chứa ViewController
//    let rootvc:UIViewController? = UIApplication.shared.delegate?.window??.rootViewController!
//    let gamevc = GameVC()
//    //Đưa nút gốc về dạng navigation
//    let aObjNavi = UINavigationController(rootViewController: gamevc)
//    rootvc?.present(aObjNavi, animated:true)
    
    openVCExist()
    
  }
  //Nếu mở màn hình chứa Navigation thì các UI design trên đó điều load ok.
  //Nếu chỉ mở viewcontroller không chứa navigation thì phải thêm thông tin set bắt kì thì nó mới hiển thị được
  func openVCExist(){
    DispatchQueue.main.async {
    let rootvc:UIViewController? = UIApplication.shared.delegate?.window??.rootViewController!
    //Mã màn hình đã thiết kế
    //let vc = UIStoryboard.main.instantiateViewController(withIdentifier: "ViewVC")
    //let vc = UIStoryboard.main.instantiateViewController(withIdentifier: "MainVC")
    //let vc = UIStoryboard.main.instantiateViewController(withIdentifier: "MainNavigationVC")
    //let vc = UIStoryboard.main.instantiateViewController(withIdentifier: "MainTabVC")
    let vc = UIStoryboard.main.instantiateViewController(withIdentifier: "MainNavigationVC")
      vc.modalPresentationStyle =  .fullScreen
    //Mở màn hình chưa thiết kế
//    let vc = MainVC()
//    let ui = UIButton()
//    ui.backgroundColor = UIColor.blue
//    ui.setTitle("OKOKOKO", for: UIControlState.normal)
//    ui.frame = CGRect(x: 0, y: 0, width: 100, height: 100)
//    ui.addTarget(self, action: #selector(increment), for: .touchUpInside)
//    vc.view.backgroundColor = UIColor.orange
//    vc.view.addSubview(ui)
      rootvc!.modalPresentationStyle =  .fullScreen
      rootvc!.modalPresentationStyle =  UIModalPresentationStyle(rawValue: 0)!
    rootvc!.present(vc, animated: true, completion: nil)
     
    }
  }
  func openViewController(){
    let rootvc:UIViewController? = UIApplication.shared.delegate?.window??.rootViewController!
    let vc = UIViewController()
    let ui = UIButton()
    ui.backgroundColor = UIColor.blue
    ui.setTitle("OKOKOKO", for: UIControl.State.normal)
    ui.frame = CGRect(x: 0, y: 0, width: 100, height: 100)
    ui.addTarget(self, action: #selector(increment), for: .touchUpInside)
    vc.view.backgroundColor = UIColor.orange
    vc.view.addSubview(ui)
    rootvc!.present(vc, animated: true, completion: nil)
  }
  
  @objc func increment() {
    //let r=UIAlertView.init(title: "ok", message: "ok", delegate: nil, cancelButtonTitle: "OK")
    //r.show()
    let rootvc:UIViewController? = UIApplication.shared.delegate?.window??.rootViewController!
    rootvc?.dismiss(animated: true, completion: nil)
    
  }
  func openNavigationController(){
    let rootvc:UIViewController? = UIApplication.shared.delegate?.window??.rootViewController!
    let ui = UIButton()
    ui.backgroundColor = UIColor.blue
    ui.setTitle("OKOKOKO", for: UIControl.State.normal)
    ui.frame = CGRect(x: 0, y: 64, width: 100, height: 100)
    ui.addTarget(self, action: #selector(openChildView), for: .touchUpInside)
    vc.view.backgroundColor = UIColor.orange
    vc.view.addSubview(ui)
    rootvc!.present(vc, animated: true, completion: nil)
  }
  @objc func closeChildView() {
      print("close::   ")
    DispatchQueue.main.async {
      let rootvc:UIViewController? = UIApplication.shared.delegate?.window??.rootViewController!
      rootvc?.dismiss(animated: true, completion: nil)
    }
  }
  @objc func openChildView() {
    
    let vcdetail = UIViewController()
    vcdetail.view.backgroundColor = UIColor.orange
    //Nếu dùng nó thì sẽ không có nút back
    //vc.present(vcdetail,animated: true,completion: nil)
    //Sẽ có nút back
    vc.pushViewController(vcdetail, animated: true)
  }
}
