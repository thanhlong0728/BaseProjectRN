//
//  AppDataSingleton.swift
//  NFT_SNAP_APP
//
//  Created by PiPyL on 24/08/2022.
//

import UIKit

class AppDataSingleton: NSObject {

  static let shared = AppDataSingleton()
  
  var guardTextField: UITextField?
  
  override init() {
    super.init()
  }
}
