function list_to_tree(list) {
    const map1 = new Map();
    var node,
      roots = [],
      i;
  
    for (i = 0; i < list.length; i += 1) {
      map1.set(list[i]._id.toString(), i); // initialize the map
      list[i].childs = []; // initialize the children
    }
  
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parent) {
        list[map1.get(node.parent.toString())].childs.push(node);
      } else {
        roots.push(node);
      }
    }
  
    let newList = [];
    for (let z = 0; z < roots.length; z++) {
      newList.push(list.filter((x) => x._id === roots[z]._id)[0]);
    }
  
    return newList;
  }
  
  const list = [{
     _id:1,
     user_id:12345,
     category_id:6789,
     data:{name:"root"},
     parent:null,
     childs:[2,3]
  },
  {
     _id:2,
     user_id:12345,
     category_id:6789,
     data:{name:"child1"},
     parent:1,
     childs:[]
  },
  {
     _id:3,
     user_id:12345,
     category_id:6789,
     data:{name:"child2"},
     parent:1,
     childs:[4]
  },
  {
     _id:4,
     user_id:12345,
     category_id:6789,
     data:{name:"child2_1"},
     parent:3,
     childs:[]
  }]
  
  console.log(list_to_tree(list))