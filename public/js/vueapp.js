var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})


var vot = new Vue({

    el: '#opps',
    data: {
      tota: 'yes ok'
    }

})


var app2 = new Vue({
  el: '#app-2',
  data: {
    id: 'inspect-me'
  }
})

var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})

var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
})





var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})


Vue.component('todoi', {
  template: '<li>This is a todo</li>'
})




var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'yahoo',
    i: [1,2,3,4],
    firstName: 'Foo',
    lastName: 'Bar',
    products: 'test'
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    },
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})




Vue.component('todo', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})



var data = { a: 1, items: []}
var vm = new Vue({
  el: '#test',
  data: data,
  created: function () {
   // `this` points to the vm instance
   var self = this;
   console.log('a is: ' + this.a)
   $.ajax({
       url: '/products',
       method: 'GET',
       success: function (d) {
           self.items = d;
           console.log(self.items);
       },
       error: function (error) {
           alert(JSON.stringify(error));
       }
   })

 }
})
