(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{273:function(t,n,e){"use strict";e.r(n);var o={props:{buttonText:{type:String,required:!0},route:{type:String,default:null},clickAction:{type:[Function,String],default:null}},methods:{handleClick:function(){if(this.route)this.$router.push(this.route);else if("function"==typeof this.clickAction)this.clickAction();else if("string"==typeof this.clickAction&&"addPokemon"===this.clickAction)this.$emit("addPokemon")}}},c=e(42),component=Object(c.a)(o,(function(){var t=this;return(0,t._self._c)("button",{staticClass:"btn btn-secondary btn-rounded btn-sm text-sm",on:{click:t.handleClick}},[t._v(t._s(t.buttonText))])}),[],!1,null,null,null);n.default=component.exports}}]);