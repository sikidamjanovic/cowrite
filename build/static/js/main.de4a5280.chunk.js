(window.webpackJsonpcoauthor=window.webpackJsonpcoauthor||[]).push([[0],{121:function(e,t,a){},324:function(e,t,a){e.exports=a(610)},610:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(7),c=a.n(o),i=a(111),l=a(32),s=a(33),u=a(36),m=a(34),h=a(37),p=a(612),d=a(13),y=a(611),E=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=p.a.Meta;return r.a.createElement(p.a,{actions:[r.a.createElement(d.a,{type:"heart",key:"heart"}),r.a.createElement(d.a,{type:"book",key:"book"}),r.a.createElement(d.a,{type:"user",key:"user"})]},r.a.createElement(e,{avatar:r.a.createElement(y.a,{src:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}),title:this.props.title,description:this.props.content}))}}]),t}(n.Component),b=a(46),f=a(90),g=(a(121),function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"getPrompts",value:function(){var e=this.props.posts;if(e)return e.map(function(e,t){return r.a.createElement(b.a,{id:"prompt"},r.a.createElement(E,{key:e.id,id:e.id,title:e.title,content:e.content}))})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(f.a,null,r.a.createElement("h3",null,"Popular"),this.getPrompts()))}}]),t}(n.Component)),O=a(88),k=a(613),w=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={},a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=k.a.SubMenu;return r.a.createElement(k.a,{onClick:this.handleClick,style:{width:"100%",height:"100vh"},defaultSelectedKeys:["1"],defaultOpenKeys:["sub1"],mode:"inline"},r.a.createElement(e,{key:"sub1",title:r.a.createElement("span",null,r.a.createElement(d.a,{type:"edit"}),r.a.createElement("span",null,"Prompts"))},r.a.createElement(k.a.ItemGroup,{key:"g1",title:"Filter"},r.a.createElement(k.a.Item,{key:"1"},"Hot"),r.a.createElement(k.a.Item,{key:"2"},"Most Liked")),r.a.createElement(k.a.ItemGroup,{key:"g2",title:"Categories"},r.a.createElement(k.a.Item,{key:"3"},"Comedy"),r.a.createElement(k.a.Item,{key:"4"},"Drama"),r.a.createElement(k.a.Item,{key:"5"},"Romance"),r.a.createElement(k.a.Item,{key:"6"},"Sci-Fi"),r.a.createElement(k.a.Item,{key:"7"},"Other"))),r.a.createElement(e,{key:"sub2",title:r.a.createElement("span",null,r.a.createElement(d.a,{type:"edit"}),r.a.createElement("span",null,"Stories"))},r.a.createElement(k.a.ItemGroup,{key:"g3",title:"Filter"},r.a.createElement(k.a.Item,{key:"8"},"Recently Completed"),r.a.createElement(k.a.Item,{key:"9"},"Most Liked"),r.a.createElement(k.a.Item,{key:"10"},"Best Rated")),r.a.createElement(k.a.ItemGroup,{key:"g4",title:"Categories"},r.a.createElement(k.a.Item,{key:"11"},"Comedy"),r.a.createElement(k.a.Item,{key:"12"},"Drama"),r.a.createElement(k.a.Item,{key:"13"},"Romance"),r.a.createElement(k.a.Item,{key:"14"},"Sci-Fi"),r.a.createElement(k.a.Item,{key:"15"},"Other"))),r.a.createElement(e,{key:"sub3",title:r.a.createElement("span",null,r.a.createElement(d.a,{type:"user"}),r.a.createElement("span",null,"Account"))},r.a.createElement(k.a.ItemGroup,{key:"g5",title:"Filter"},r.a.createElement(k.a.Item,{key:"16"},"Posts"),r.a.createElement(k.a.Item,{key:"17"},"Liked"),r.a.createElement(k.a.Item,{key:"18"},"Saved"),r.a.createElement(k.a.Item,{key:"19"},"Profile"))))}}]),t}(n.Component),v=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return console.log(this.props.posts),r.a.createElement("div",{id:"home"},r.a.createElement(f.a,null,r.a.createElement(b.a,{xs:12,md:4},r.a.createElement(w,null)),r.a.createElement(b.a,{xs:12,sm:18,offset:1,id:"feed-container"},r.a.createElement(g,{posts:this.props.posts}))))}}]),t}(n.Component),j=Object(O.b)(function(e){return{posts:e.post.posts}})(v),C=a(73),I=a(151),S=a(211),P=a.n(S),R=a(148);function M(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}var T=function(e){return function(t,a,n){n.getFirebase;var r=(0,n.getFirestore)();console.log(e),r.collection("posts").add(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?M(a,!0).forEach(function(t){Object(R.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):M(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({},e,{author:"sikiDamjanovic",createdAt:new Date})).then(function(){t({type:"CREATE_POST",post:e})}).catch(function(e){t({type:"CREATE_PROJECT_ERROR",err:e})})}},A=a(616),F=a(615),x=a(614),D=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).handleChange=function(t){e.setState(Object(R.a)({},t.target.id,t.target.value))},e.handleSubmit=function(t){t.preventDefault(),console.log(e.state),e.props.createPost(e.state)},e.state={title:"",content:""},e}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=A.a.TextArea,t=F.a.Option;return r.a.createElement(x.a,{onSubmit:this.handleSubmit,className:"login-form"},r.a.createElement(x.a.Item,null,r.a.createElement(A.a,{id:"title",onChange:this.handleChange,placeholder:"Title"})),r.a.createElement(x.a.Item,null,r.a.createElement(e,{id:"content",onChange:this.handleChange,rows:5,placeholder:"Content"})),r.a.createElement(x.a.Item,null,r.a.createElement(F.a,{showSearch:!0,style:{width:200},placeholder:"Category",optionFilterProp:"children",filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0}},r.a.createElement(t,{value:"comedy"},"Comedy"),r.a.createElement(t,{value:"drama"},"Drama"),r.a.createElement(t,{value:"romance"},"Romance"),r.a.createElement(t,{value:"scifi"},"Sci-Fi"))),r.a.createElement(I.a,{type:"primary",htmlType:"submit"},r.a.createElement(d.a,{type:"plus"}),"Post Prompt"))}}]),t}(n.Component),G=Object(O.b)(null,function(e){return{createPost:function(t){return e(T(t))}}})(D),L={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",width:"50%",marginRight:"-50%",transform:"translate(-50%, -50%)"}};P.a.setAppElement("#root");var Y=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(P.a,{isOpen:this.props.isOpen,onRequestClose:this.closeModal,style:L,shouldCloseOnOverlayClick:!0},r.a.createElement(I.a,{onClick:this.props.close},"X"),r.a.createElement(G,{isOpen:this.props.isOpen}))}}]),t}(r.a.Component),_=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={openModal:!1},a.showModal=a.showModal.bind(Object(C.a)(a)),a.closeModal=a.closeModal.bind(Object(C.a)(a)),a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"showModal",value:function(){this.setState({openModal:!0})}},{key:"closeModal",value:function(){this.setState({openModal:!1})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(Y,{isOpen:this.state.openModal,close:this.closeModal}),r.a.createElement(k.a,{id:"navBar",mode:"horizontal",defaultSelectedKeys:["home"]},r.a.createElement(I.a,{type:"primary",id:"newPrompt",onClick:this.showModal},r.a.createElement(d.a,{type:"plus"}),"New Prompt"),r.a.createElement(k.a.Item,{key:"home"},r.a.createElement(i.b,{to:"/"},r.a.createElement(d.a,{type:"home"}),"Home")),r.a.createElement(k.a.Item,{key:"book"},r.a.createElement(i.b,{to:"/saved"},r.a.createElement(d.a,{type:"book"}),"Sign Out"))))}}]),t}(n.Component),q=function(){return r.a.createElement(i.a,null,r.a.createElement("div",null,r.a.createElement(_,null),r.a.createElement(j,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var K=a(61),B={},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B;arguments.length>1&&arguments[1];return e},W={posts:[{id:1,title:"Greek God Revenge",content:"Youre an ancient Greek man coming home from 4 months of war to find your wife 3 months pregnant. Now youve embarked on a solemn quest: to punch Zeus in the face."},{id:2,title:"Where Is My Super Suit",content:'The Suit is powerfull. A mech for some, body armor for others, always unique to each person who wore it. Those who wear it, hear the words "not original user, booting basic mode" As a joke, your sergeant gives you The Suit and the first thing you hear is: "User detected: Welcome back, Commander"'},{id:3,title:"School Reunion",content:"The nightmare has come true; youve woken up back in sixth grade with your memories and knowledge of everything that happened since then intact. You start staring at your classmates around you, aware of how they end up. Your teacher asks you whats wrong as you start weeping."},{id:4,title:"Seth The Killer",content:"The nightmare has come true; youve woken up back in sixth grade with your memories and knowledge of everything that happened since then intact. You start staring at your classmates around you, aware of how they end up. Your teacher asks you whats wrong as you start weeping."},{id:5,title:"School Reunion",content:"The nightmare has come true; youve woken up back in sixth grade with your memories and knowledge of everything that happened since then intact. You start staring at your classmates around you, aware of how they end up. Your teacher asks you whats wrong as you start weeping."}]},H=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_POST":return console.log("created post",t.post),e;case"CREATE_POST_ERR":return console.log("create project error",t.err),e;default:return e}},J=Object(K.c)({auth:z,post:H}),N=a(321),X=a(214),U=a(215),Z=a(150),V=a.n(Z);a(605),a(608);V.a.initializeApp({apiKey:"AIzaSyC-1qE_pSDh3kKMmLI3fA4iErj4qGuZrgw",authDomain:"writingrelay.firebaseapp.com",databaseURL:"https://writingrelay.firebaseio.com",projectId:"writingrelay",storageBucket:"",messagingSenderId:"549963888326",appId:"1:549963888326:web:65281ab754acef09"}),V.a.firestore().settings({timestampsInSnapshots:!0});var $=V.a,Q=Object(K.e)(J,Object(K.d)(Object(K.a)(N.a.withExtraArgument({getFirestore:X.getFirestore,getFirebase:U.getFirebase})),Object(X.reduxFirestore)($),Object(U.reactReduxFirebase)($)));c.a.render(r.a.createElement(O.a,{store:Q},r.a.createElement(q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[324,1,2]]]);
//# sourceMappingURL=main.de4a5280.chunk.js.map