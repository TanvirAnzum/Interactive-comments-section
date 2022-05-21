fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    let data = json;

    comments(data.comments);
    userInfo(data.currentUser);
    // console.log(data);
  });

function userInfo(user) {
  console.log(user);
  console.log(user.image);
  addComment(user.image.webp, 'null');
}

function comments(comment) {
  let comment_div_count = '0';
  for (let i = 0; i < comment.length; i++) {
    let usr = comment[i].user;
    comment_div_count++;

    /// this is for checking how many replies the comment have
    let replies = comment[i].replies;
    let no_of_replies = replies.length;

    let image = usr.image;
    elm(
      comment[i].score,
      image.png,
      usr.username,
      comment[i].createdAt,
      comment[i].content,
      0,comment_div_count,no_of_replies
    );
    
    // console.log(replies);
    
    for (let i = 0; i < replies.length; i++) {
        comment_div_count++;
      let r_usr = replies[i].user;
      let r_img = r_usr.image;
      no_of_replies = 0;
      elm(
        replies[i].score,
        r_img.png,
        r_usr.username,
        replies[i].createdAt,
        replies[i].content,
        usr.username,comment_div_count,no_of_replies
      );
    }
  }
}

function elm(score, source, usrname, time, content, is_reply, current_user, no_of_replies) {
  let main_div = document.createElement("div");
  main_div.id = "current-user-" + current_user;
  main_div.classList.add("container__content");
  if (is_reply) {
    main_div.classList.add("reply");
    {
      let div = document.createElement("div");
      div.classList.add("intend-bar");
      main_div.appendChild(div);
    }
    
  }
  /// score section
  {
    let div = document.createElement("div");
    div.classList.add("container__content-rating");
    let img = document.createElement("img");
    img.src = "./images/icon-plus.svg";
    div.appendChild(img);
    let p = document.createElement("p");
    p.id = "rating";
    p.innerHTML = score;
    div.appendChild(p);
    let img2 = document.createElement("img");
    img2.src = "./images/icon-minus.svg";
    div.appendChild(img2);
    main_div.appendChild(div);
  }

  //profile image section
  {
    let div = document.createElement("div");
    div.classList.add("container__content-img");
    let img = document.createElement("img");
    img.src = source;
    div.appendChild(img);
    main_div.appendChild(div);
  }

  //user name section

  {
    let div = document.createElement("div");
    div.classList.add("container__content-name");
    let p = document.createElement("p");
    p.id = "user-name";
    p.innerHTML = usrname;
    div.appendChild(p);
    main_div.appendChild(div);
  }

  //time section

  {
    let div = document.createElement("div");
    div.classList.add("container__content-time");
    let p = document.createElement("p");
    p.id = "time";
    p.innerHTML = time;
    div.appendChild(p);
    main_div.appendChild(div);
  }

  //replay

  if(usrname == "juliusomo") {
    let div = document.createElement("div");
    div.classList.add("user-buttons");
    let btn1 = document.createElement('button')
    btn1.id = 'delete-btn';
    btn1.innerHTML = '<i class="fa-solid fa-trash"></i> Delete';
    div.appendChild(btn1);
    let btn2 = document.createElement('button')
    btn2.id = 'edit-btn';
    btn2.innerHTML = '<i class="fa-solid fa-pencil"></i> Edit';
    div.appendChild(btn2);
    main_div.appendChild(div);
  }
  else {
    let div = document.createElement("div");
    div.classList.add("container__content-replay");
    let img = document.createElement("img");
    img.src = "./images/icon-reply.svg";
    let p = document.createElement("button");
    p.classList.add('reply-button');
    p.id = "reply-button-" + current_user;
    p.innerHTML = "Replay";
    p.setAttribute('value',no_of_replies);
    if(is_reply) {
      p.setAttribute('onclick','replay_btn_toggle(this,true)');
    }
    else p.setAttribute('onclick','replay_btn_toggle(this,false)');
    div.appendChild(img);
    div.appendChild(p);
    main_div.appendChild(div);
  }

  // comment

  {
    let div = document.createElement("div");
    div.classList.add("container__content-comment");
    let p = document.createElement("p");
    p.id = "comment";
    if(is_reply) {
      // let span = document.createElement('span');
      // span.classList.add('mention');
      // span.id = 'span-mention';
      // span.innerHTML = '@' + is_reply + ' ';
      let span = "<span class='mention'>@ " + is_reply + " </span>";
      p.innerHTML = span + content;
      
    }
    else p.innerHTML = content;
    div.appendChild(p);
    main_div.appendChild(div);
  }

  document.getElementsByClassName("container")[0].appendChild(main_div);
}

function addComment(source, parentnode,is_reply) {
  let comment_area = document.createElement("div");
  comment_area.classList.add("comment-area");
  if(is_reply) comment_area.classList.add('reply'); 

  let main_div = document.createElement("div");
  main_div.classList.add("add-comment");

  let img = document.createElement("img");
  img.src = source;
  img.id = "main-user-img";
  main_div.appendChild(img);

  let text_area = document.createElement("textarea");
  text_area.id = "usr-comment-text";
  text_area.setAttribute("rows", "6");
  text_area.setAttribute("placeholder", "Add a comment...");
  main_div.appendChild(text_area);

  let btn = document.createElement("button");
  btn.innerHTML = "SEND";
  btn.classList.add("btn");
  btn.id = "submit-btn";
  main_div.appendChild(btn);

  comment_area.appendChild(main_div);
  let x = document.getElementsByClassName("container")[0];
//   x.appendChild(comment_area);
  if(parentnode != 'null') {
       //console.log(parentnode.id);
       insertAfter(parentnode,x.appendChild(comment_area)); 
  }
  else {
    x.appendChild(comment_area);
  }
}

function replay_btn_toggle(reply, is_reply) {
    // addComment('/images/icon-delete.svg');
    let comment_count = reply.value;
    // console.log(comment_count);
    let r_parent = reply.parentNode;
    r_parent = r_parent.parentNode;
    let id = r_parent.id;
    let num = id.replace(/\D/g,'');
    let new_num = parseInt(num) + parseInt(comment_count);
    let new_parent = document.getElementById('current-user-' + new_num);
    console.log(new_parent);
    ///comment area remove
    let c_area = document.getElementsByClassName('comment-area');
    for(let i=0;i<c_area.length;i++) {
        c_area[i].style.display = "none";
    }
    addComment('./images/avatars/image-juliusomo.png', new_parent, is_reply);
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}