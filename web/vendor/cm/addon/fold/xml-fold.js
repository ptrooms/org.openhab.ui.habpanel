!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function n(e,n){return e.line-n.line||e.ch-n.ch}function t(e,n,t,i){this.line=n,this.ch=t,this.cm=e,this.text=e.getLine(n),this.min=i?Math.max(i.from,e.firstLine()):e.firstLine(),this.max=i?Math.min(i.to-1,e.lastLine()):e.lastLine()}function i(e,n){var t=e.cm.getTokenTypeAt(h(e.line,n));return t&&/\btag\b/.test(t)}function r(e){if(!(e.line>=e.max))return e.ch=0,e.text=e.cm.getLine(++e.line),!0}function f(e){if(!(e.line<=e.min))return e.text=e.cm.getLine(--e.line),e.ch=e.text.length,!0}function o(e){for(;;){var n=e.text.indexOf(">",e.ch);if(n==-1){if(r(e))continue;return}{if(i(e,n+1)){var t=e.text.lastIndexOf("/",n),f=t>-1&&!/\S/.test(e.text.slice(t+1,n));return e.ch=n+1,f?"selfClose":"regular"}e.ch=n+1}}}function u(e){for(;;){var n=e.ch?e.text.lastIndexOf("<",e.ch-1):-1;if(n==-1){if(f(e))continue;return}if(i(e,n+1)){v.lastIndex=n,e.ch=n;var t=v.exec(e.text);if(t&&t.index==n)return t}else e.ch=n}}function l(e){for(;;){v.lastIndex=e.ch;var n=v.exec(e.text);if(!n){if(r(e))continue;return}{if(i(e,n.index+1))return e.ch=n.index+n[0].length,n;e.ch=n.index+1}}}function c(e){for(;;){var n=e.ch?e.text.lastIndexOf(">",e.ch-1):-1;if(n==-1){if(f(e))continue;return}{if(i(e,n+1)){var t=e.text.lastIndexOf("/",n),r=t>-1&&!/\S/.test(e.text.slice(t+1,n));return e.ch=n+1,r?"selfClose":"regular"}e.ch=n}}}function a(e,n){for(var t=[];;){var i,r=l(e),f=e.line,u=e.ch-(r?r[0].length:0);if(!r||!(i=o(e)))return;if("selfClose"!=i)if(r[1]){for(var c=t.length-1;c>=0;--c)if(t[c]==r[2]){t.length=c;break}if(c<0&&(!n||n==r[2]))return{tag:r[2],from:h(f,u),to:h(e.line,e.ch)}}else t.push(r[2])}}function s(e,n){for(var t=[];;){var i=c(e);if(!i)return;if("selfClose"!=i){var r=e.line,f=e.ch,o=u(e);if(!o)return;if(o[1])t.push(o[2]);else{for(var l=t.length-1;l>=0;--l)if(t[l]==o[2]){t.length=l;break}if(l<0&&(!n||n==o[2]))return{tag:o[2],from:h(e.line,e.ch),to:h(r,f)}}}else u(e)}}var h=e.Pos,x="A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",g=x+"-:.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",v=new RegExp("<(/?)(["+x+"]["+g+"]*)","g");e.registerHelper("fold","xml",function(e,n){for(var i=new t(e,n.line,0);;){var r,f=l(i);if(!f||i.line!=n.line||!(r=o(i)))return;if(!f[1]&&"selfClose"!=r){var u=h(i.line,i.ch),c=a(i,f[2]);return c&&{from:u,to:c.from}}}}),e.findMatchingTag=function(e,i,r){var f=new t(e,i.line,i.ch,r);if(f.text.indexOf(">")!=-1||f.text.indexOf("<")!=-1){var l=o(f),c=l&&h(f.line,f.ch),x=l&&u(f);if(l&&x&&!(n(f,i)>0)){var g={from:h(f.line,f.ch),to:c,tag:x[2]};return"selfClose"==l?{open:g,close:null,at:"open"}:x[1]?{open:s(f,x[2]),close:g,at:"close"}:(f=new t(e,c.line,c.ch,r),{open:g,close:a(f,x[2]),at:"open"})}}},e.findEnclosingTag=function(e,n,i,r){for(var f=new t(e,n.line,n.ch,i);;){var o=s(f,r);if(!o)break;var u=new t(e,n.line,n.ch,i),l=a(u,o.tag);if(l)return{open:o,close:l}}},e.scanForClosingTag=function(e,n,i,r){var f=new t(e,n.line,n.ch,r?{from:0,to:r}:null);return a(f,i)}});