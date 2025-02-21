const HiddenView = ({ isVisible, children }: any) => {
  return isVisible ? children : null
}
export default HiddenView
