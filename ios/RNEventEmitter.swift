//
//  RNEventEmitter.swift  .swift
//  NFT_SNAP_APP
//
//  Created by ThuanTruong on 22/11/2022.
//

import Foundation

@objc(RNEventEmitter)
open class RNEventEmitter: RCTEventEmitter {

  public static var emitter: RCTEventEmitter!

  override init() {
    super.init()
    RNEventEmitter.emitter = self
  }

  open override func supportedEvents() -> [String] {
    ["onFinished", "onPending"]      // etc.
  }
}
