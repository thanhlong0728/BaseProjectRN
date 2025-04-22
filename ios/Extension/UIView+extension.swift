//
//  UIView+extension.swift
//  ARGearSample
//
//  Created by Jihye on 2020/03/19.
//  Copyright © 2020 Seerslab. All rights reserved.
//

import UIKit
import Toast_Swift

extension UIView {
    func showToast(message: String, position: CGPoint) {
        var style = ToastStyle()
        style.messageFont = UIFont.systemFont(ofSize: 11)
        style.backgroundColor = UIColor.black.withAlphaComponent(0.4)
        style.messageColor = UIColor.white.withAlphaComponent(0.75)
        style.cornerRadius = 16
        
        self.makeToast(message, duration: 1.5, point: position, title: nil, image: nil, style: style, completion: nil)
    }
  func showToastBottom(message: String) {
            let toastLabel = UITextView(frame: CGRect(x: self.frame.size.width/16, y: self.frame.size.height-150, width: self.frame.size.width * 7/8, height: 35))
            toastLabel.backgroundColor = UIColor.black.withAlphaComponent(0.6)
            toastLabel.textColor = UIColor.white
            toastLabel.textAlignment = .center
            toastLabel.text = "   \(message)   "
            toastLabel.alpha = 1.0
            toastLabel.layer.cornerRadius = 10;
            toastLabel.clipsToBounds  =  true
            toastLabel.font = UIFont(name: (toastLabel.font?.fontName)!, size: 16)
         
            toastLabel.center.x = self.frame.size.width/2
            self.addSubview(toastLabel)
            UIView.animate(withDuration: 5.0, delay: 0.1, options: .curveEaseOut, animations: {
                toastLabel.alpha = 0.0
            }, completion: {(isCompleted) in
                toastLabel.removeFromSuperview()
            })
//            cb()
    }
}
