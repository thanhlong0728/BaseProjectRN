//
//  ArgearMainVC.swift
//  NFT_SNAP_APP
//
//  Created by mithang on 08/11/2022.
//

import UIKit

import CoreMedia
import SceneKit
import AVFoundation
import ARGear




class ArgearMainVC: UIViewController, ARGSessionDelegate {

  

  private var argSession: ARGSession?
  ////private var arCamera: ARGCamera!
  
  private lazy var cameraPreviewCALayer = CALayer()
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
      InitArgear()
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */


  func InitArgear(){
    // Sample Code. ARGSession Creation Example
  
    do {
        let config = ARGConfig(
            apiURL: API_HOST,
            apiKey: API_KEY,
            secretKey: API_SECRET_KEY,
            authKey: API_AUTH_KEY
        )
        argSession = try ARGSession(argConfig: config, feature: [.faceMeshTracking])
        argSession?.delegate = self



    } catch let error as NSError {
    } catch let exception as NSException {
    }
  }
  
  //func RunArgear(){
  //  argSession?.run()
  //}
  //
  //func PauseArgear(){
  //  argSession?.pause()
  //}
  //
  //func DestroyArgear(){
  //  argSession?.destroy()
  //}
  //
  //func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer, from connection: AVCaptureConnection) {
  //    argSession?.update(sampleBuffer, from: connection)
  //}
  //
  func didUpdate(_ arFrame: ARGFrame) {
    guard let renderedPixelbuffer = arFrame.renderedPixelBuffer else {
           return
       }
       // draw sublayer(CALayer())'s contents
       self.cameraPreviewCALayer.contents = renderedPixelbuffer
  }
  
  //// Sample Code. Download Contents by Requesting Singed URL
  //
  ////let callback: ARGAuthCallback = ARGAuthCallback(Success: { (url: String?) in
  ////    // Download Contents from Signed URL
  ////}) { (code: ARGStatusCode) in
  ////    // error with status code
  ////}
  ////
  ////if let session = argSession, let auth = session.auth {
  ////    auth.requestSignedUrl(withUrl: zipFileUrl, itemTitle: title, itemType: type, completion: callback)
  ////}
  //
  ////typedef NS_ENUM (NSInteger, ARGContentItemType)  {
  ////    ARGContentItemTypeSticker,
  ////    ARGContentItemTypeFilter,
  ////    ARGContentItemTypeBeauty,
  ////    ARGContentItemTypeBulge,
  ////    ARGContentItemTypeNum
  ////}
  //
  ////// Sample Code. An example of setting an ARG Item
  ////func setContent(){
  ////  /*
  ////   type           ARGContentItemType
  ////   filePath       Contents downloaded path
  ////   itemID         uuid of an item
  ////   completion     callback result
  ////   */
  ////
  ////  if let session = argSession, let contents = session.contents {
  ////      contents.setItemWith(.sticker, withItemFilePath: targetPath, withItemID: uuid) { (success, msg) in
  ////          if (success) {
  ////              // success
  ////          } else {
  ////              // fail
  ////          }
  ////      }
  ////  }
  ////
  ////}
  //
  //func EnableFaceBeautification(){
  //  // Sample Code. Enabling Face Beautification
  //
  //  if let session = argSession, let contents = session.contents {
  //      contents.setBulge(.NONE)
  //      contents.setDefaultBeauty()
  //  }
  //
  //}
  //
  //func SetFaceBeautification(){
  //  // Sample Code. Manipulating Face Beautification Effects
  //
  //  if let session = argSession, let contents = session.contents {
  //
  //      // Set a Specific Face Beautification Effect Level
  //      contents.setBeauty(.faceSlim, value: 0.7)
  //
  //      // Set 16 Face Beautification Effects at the Same Time
  //      var beautyValue: [Float] = [
  //          10.0,
  //          90.0,
  //          55.0,
  //          -50.0,
  //          5.0,
  //          -10.0,
  //          0.0,
  //          35.0,
  //          30.0,
  //          -35.0,
  //          0.0,
  //          0.0,
  //          0.0,
  //          50.0,
  //          0.0,
  //          0.0
  //      ]
  //
  //      let beautyValuePointer: UnsafeMutablePointer<Float> = UnsafeMutablePointer(&beautyValue)
  //      contents.setBeautyValues(beautyValuePointer)
  //  }
  //}
  //
  //func SetBulge(){
  //  // Sample Code. Set Face Bulge Fun Type
  //
  //  if let session = argSession, let contents = session.contents {
  //      contents.setBulge(.FUN1)
  //  }
  //}
  //
  //func RemoveContent(){
  //  // Sample Code. Removing Contents Example
  //
  //  if let session = argSession, let contents = session.contents {
  //      contents.clear(.sticker)
  //  }
  //}
  //
  ////func SetMedia(){
  ////  // Sample Code. Setting Video Device Information in ARGMedia Class
  ////
  ////  // videoDevice: AVCaptureDevice
  ////  // videoDeviceOrientation: AVCaptureVideoOrientation
  ////  // videoConnection: AVCaptureConnection
  ////  // mediaRatio: ARGMediaRatio
  ////  // videoBitrate: ARGMediaVideoBitrate
  ////
  ////  var arMedia = ARGMedia()
  ////
  ////  arMedia.setVideoDevice(arCamera.cameraDevice)
  ////  arMedia.setVideoDeviceOrientation(arCamera.cameraConnection.videoOrientation)
  ////  arMedia.setVideoConnection(arCamera.cameraConnection)
  ////  arMedia.setMediaRatio(._4x3)
  ////  arMedia.setVideoBitrate(._2M)
  ////}
  //
  ////func TakePhoto(){
  ////  // Sample Code. Getting a Captured Image
  ////
  ////  let imageView = UIImageView(frame: frame)
  ////  arMedia.takePic { image in
  ////      imageView.image = image
  ////  }
  ////}
  ////
  ////func RecordVideo(){
  ////  // Sample Code. Start and Stop Video Recording
  ////
  ////  // Start Video Recording
  ////  arMedia.recordVideoStart { (sec) in
  ////      // recTime represents recorded time
  ////  }
  ////
  ////  // Stop Video Recording
  ////  arMedia.recordVideoStop({ (videoInfo) in
  ////  }) { (resultVideoInfo) in
  ////      // convert video data into NSDictionary form
  ////  }
  ////}
  //
  ////func FlipCamera(){
  ////  // Sample Code. Flip Camera Face
  ////
  ////  if let session = argSession {
  ////
  ////      // ARGSession Pause
  ////      session.pause()
  ////      arCamera.toggleCamera(with: .back) {
  ////
  ////          // ARGSession Resume
  ////          session.run()
  ////      }
  ////  }
  ////}
  //
  //func EnableDebugMode(){
  //  // Sample Code. Enable and Disable Debugging Mode
  //
  //  if let session = argSession {
  //
  //      // Enable Debugging Mode
  //      session.inferenceDebugOption = .optionDebugFaceLandmark2D
  //
  //      // Disable Debugging Mode
  //      session.inferenceDebugOption = .optionDebugNON
  //  }
  //}
  //
  ///*
  // ARGSession in ARSession
  // let config = ARGConfig(
  //     apiURL: API_HOST,
  //     apiKey: API_KEY,
  //     secretKey: API_SECRET_KEY,
  //     authKey: API_AUTH_KEY
  // )
  //
  // argSession = try ARGSession(argConfig: config)
  // argSession?.delegate = self
  // } catch let error as NSError {
  // } catch let exception as NSException {
  // }
  //
  // argSession?.run()
  //
  // arKitSession = ARSession()
  //
  // let arkitFaceTrackingConfig = ARFaceTrackingConfiguration()
  // arKitSession?.delegate = self
  // arKitSession?.run(arkitFaceTrackingConfig)
  //
  // // ARSessionDelegate
  // public func session(_ session: ARSession, didUpdate frame: ARFrame) {
  //
  //     let viewportSize = view.bounds.size
  //     var updateFaceAnchor: ARFaceAnchor? = nil
  //     var isFace = false
  //     if let faceAnchor = frame.anchors.first as? ARFaceAnchor {
  //         if faceAnchor.isTracked {
  //             updateFaceAnchor = self.currentARKitFaceAnchor
  //             isFace = true
  //         }
  //     } else {
  //         if let _ = frame.anchors.first as? ARPlaneAnchor {
  //         }
  //     }
  //
  //     let handler: ARGSessionProjectPointHandler = { (transform: simd_float3, orientation: UIInterfaceOrientation, viewport: CGSize) in
  //         return frame.camera.projectPoint(transform, orientation: orientation, viewportSize: viewport)
  //     }
  //
  //     if isFace {
  //         if let faceAnchor = updateFaceAnchor {
  //             self.argSession?.applyAdditionalFaceInfo(withPixelbuffer: frame.capturedImage, transform: faceAnchor.transform, vertices: faceAnchor.geometry.vertices, viewportSize: viewportSize, convert: handler)
  //         } else {
  //             self.argSession?.feedPixelbuffer(frame.capturedImage)
  //         }
  //     } else {
  //             self.argSession?.feedPixelbuffer(frame.capturedImage)
  //     }
  // }
  //
  // // ARGSessionDelegate
  // public func didUpdate(_ arFrame: ARGFrame) {
  //     guard let _ = arKitSession.configuration as? ARFaceTrackingConfiguration else  {
  //         return
  //     }
  //
  //     if let cvPixelBuffer = arFrame.renderedPixelBuffer {
  //         // draw cvPixelBuffer
  //     }
  // }
  //
  // */

}

