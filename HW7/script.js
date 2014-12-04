NodeList.prototype.forEach = Array.prototype.forEach;

function my_$(element) {
    this.elements = document.querySelectorAll(element);
    this.length = this.elements.length;
    var _this = this;

    this.width = function (newWidth) {
        if (newWidth === undefined) {
            var tmpArr = [];
            elements.forEach(function (item) {
                var tmp = getStyle(item, 'width');
                if (tmp === undefined) {
                    tmpArr.push("0px");
                } else {
                    tmpArr.push(tmp);
                }
            });
            return tmpArr;
        }
        else {
            elements.forEach(function (item) {
                item.style.width = newWidth;
            });
            return _this;
        }
    }

    this.height = function (newHeight) {
        if (newHeight === undefined) {
            var tmpArr = [];
            elements.forEach(function (item) {
                var tmp = getStyle(item, 'height');
                if (tmp === undefined) {
                    tmpArr.push("0px");
                } else {
                    tmpArr.push(tmp);
                }
            });
            return tmpArr;
        }
        else {
            elements.forEach(function (item) {
                item.style.height = newHeight;
            });
            return _this;
        }
    }

    this.css = function(property,par,time){
        if(typeof(property) == 'object'){
            if(par != undefined){
                setTimeout(function(){
                    for(prop in property){
                        elements.forEach(function (item){
                        item.style[prop] = property[prop];
                        });
                    }
                },par);
                return _this;
            } else{
                for(prop in property){
                    elements.forEach(function(item){
                        item.style[prop] = property[prop];
                    });
                }
                return _this;
            }
        }
        else{
            if(time != undefined){
                setTimeout(function(){
                    elements.forEach(function(item){
                        item.style[property] = par;
                    });
                },time);

                return _this;
            }else{
                elements.forEach(function(item){
                    item.style[property] = par;
                });
                return _this;
            }
        }
    }
    return this;
}

    function getStyle(elm, cssProp) {
        var strVal = "";
        if (document.defaultView && document.defaultView.getComputedStyle) {
            strVal = document.defaultView.getComputedStyle(elm, "").getPropertyValue(cssProp);
        } else if (elm.currentStyle) {
            cssProp = cssProp.replace(/\-(\w)/g, function (strMatch, p1) {
                return p1.toUpperCase();
            });
            strVal = elm.currentStyle[cssProp];
        }
        return strVal;

}