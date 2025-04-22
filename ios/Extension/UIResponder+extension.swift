import UIKit
extension UIResponder {
    func parentController<T: UIViewController>(of type: T.Type) -> T? {
        guard let next = self.next else {
            return nil
        }
        return (next as? T) ?? next.parentController(of: T.self)
    }
}
