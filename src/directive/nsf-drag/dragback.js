export default {
  bind(el, binding, vnode) {
    const dialogHeaderEl = el.querySelector('.nsf-drag__header')
    const dragDom = el.querySelector('.nsf-drag').parentNode
    dialogHeaderEl.style.cssText += ';cursor:move;'
    // dragDom.style.cssText += ';top:0px;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const getStyle = (function() {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
      console.log('disX:' + disX + ',disY:' + disY)
      const dragDomWidth = dragDom.offsetWidth
      const dragDomHeight = dragDom.offsetHeight
      console.log('dragDomWidth:' + dragDomWidth + ',dragDomHeight:' + dragDomHeight)
      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight
      console.log('screenWidth:' + screenWidth + ',screenHeight:' + screenHeight)
      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
      console.log('minDragDomLeft:' + minDragDomLeft + ',maxDragDomLeft:' + maxDragDomLeft)
      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight
      console.log('minDragDomTop:' + minDragDomTop + ',maxDragDomTop:' + maxDragDomTop)
      // 获取到的值带px 正则匹配替换
      let styL = getStyle(dragDom, 'left')
      let styT = getStyle(dragDom, 'top')
      console.log('styL:' + styL + ',styT:' + styT)
      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
      } else {
        styL = +styL.replace(/\px/g, '')
        styT = +styT.replace(/\px/g, '')
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-(left) > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }

        if (-(top) > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // 移动当前元素
        console.log(left + styL + '   ' + top + styT)
        // dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
        // emit onDrag event
        // vnode.child.$emit('dragDialog')
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}