//
//  BeautyManager.swift
//  ARGearSample
//
//  Created by Jihye on 2020/02/10.
//  Copyright © 2020 Seerslab. All rights reserved.
//

import Foundation
import ARGear

class BeautyManager {
  static let shared = BeautyManager()
  
  private var beautyValues: [Float] = Array(repeating: 0, count: ARGContentItemBeauty.num.rawValue)
  var sliderValues: [Float] = [
    0.1,
    0.25,
    0.55,
    0.5,
    0.05,
    0.45,
    0,
    0.35,
    0.65,
    0.43,
    0,
    0.5,
    0.5,
    0,
    0,
    0
  ]

  var argSession: ARGSession?
  var beautyRange200Array: [ARGContentItemBeauty] = [
    .chin,
    .eyeGap,
    .noseLength,
    .mouthSize,
    .eyeCorner,
    .lipSize
  ]
  
  init() {
    //        self.loadBeautyValue()
  }
  
  public func start() {
    guard let session = self.argSession, let contents = session.contents
    else { return }
    
    contents.setBulge(.NONE)
    contents.setDefaultBeauty()
    
    contents.setBeauty(.faceSlim, value: 25)
  }
  
  public func setDefault() {
    guard let session = self.argSession, let contents = session.contents
    else { return }
    
    contents.setDefaultBeauty()
    contents.setBeauty(.faceSlim, value: 25)
    
    sliderValues = [
      0.1,
      0.25,
      0.55,
      0.5,
      0.05,
      0.45,
      0,
      0.35,
      0.65,
      0.43,
      0,
      0.5,
      0.5,
      0,
      0,
      0
    ]
  }
  
  public func off() {
    guard let session = self.argSession, let contents = session.contents
    else { return }
    
    //        self.loadBeautyValue()
    
    contents.setBeautyOn(false)
  }
  
  public func on() {
    guard let session = self.argSession, let contents = session.contents
    else { return }
    
    let beautyValuePointer: UnsafeMutablePointer<Float> = UnsafeMutablePointer(&self.beautyValues)
    
    contents.setBeautyValues(beautyValuePointer)
  }
  
  public func setBeauty(type: ARGContentItemBeauty, value: Float) {
    guard let session = self.argSession, let contents = session.contents
    else { return }
    
    sliderValues[type.rawValue] = value
    
    let value = self.convertSliderValueToBeautyValue(type: type, value: value)
    beautyValues[type.rawValue] = value
    
    print("Value saved: ", value)
    
    contents.setBeauty(type, value: value)
  }
  
  public func getBeautyValue(type: ARGContentItemBeauty) -> Float {
    guard let session = self.argSession, let contents = session.contents
    else { return 0 }
    
    let value = contents.getBeautyValue(type)
    
    return self.convertBeautyValueToSliderValue(type: type, value: value)
  }
  
  // load current ARGear's beauty values
  //    private func loadBeautyValue() {
  //        guard let session = self.argSession, let contents = session.contents
  //            else { return }
  //
  //        for i in 0..<ARGContentItemBeauty.num.rawValue {
  //            self.beautyValues[i] = contents.getBeautyValue(ARGContentItemBeauty(rawValue: i)!)
  //        }
  //    }
  
  // 0 ~ 1 -> 0 ~ 100 or -100 ~ 100
  private func convertSliderValueToBeautyValue(type: ARGContentItemBeauty, value: Float) -> Float {
    var beautyValue = value
    if value < 0 {
      beautyValue = 0.0;
    }
    
    if value > 1 {
      beautyValue = 1.0;
    }
    
    if beautyRange200Array.contains(type) {
      beautyValue = (beautyValue * 200.0) - 100.0
    } else {
      beautyValue = beautyValue * 100.0
    }
    
    var rate: Float = 2
    
    switch type {
    case .vline:
      rate = 1.5
      break
    case .faceSlim:
      break
    case .jaw:
      break
    case .chin:
      break
    case .eye:
      break
    case .eyeGap:
      break
    case .noseLine:
      break 
    case .noseSise:
      break
    case .noseLength:
      break
    case .mouthSize:
      rate = 1.5
      break
    case .eyeBack:
      break
    case .eyeCorner:
      rate = 1.5
      break
    case .lipSize:
      rate = 1.5
      break
    case .skinFace:
      rate = 1.5
      break
    case .skinDarkCircle:
      rate = 1.5
      break
    case .skinMouthWrinkle:
      rate = 1
      break
    case .num:
      rate = 1
      break
    @unknown default:
      break
    }
    
    return beautyValue * rate
  }
  
  // 0 ~ 100 or -100 ~ 100 -> 0 ~ 1
  private func convertBeautyValueToSliderValue(type: ARGContentItemBeauty, value: Float) -> Float {
    return sliderValues[type.rawValue]
//    var beautyValue = value
//    if beautyRange200Array.contains(type) {
//      beautyValue = (value + 100.0) / 200.0
//    } else {
//      beautyValue = value / 100.0
//    }
//
//    return beautyValue
  }
}
