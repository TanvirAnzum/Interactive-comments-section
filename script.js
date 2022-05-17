
fetch('./data.json').then(response =>  {
    return response.json();
}).then(json =>{
   let data = json;
    userInfo(data.currentUser);
    comments(data.comments);
    // console.log(data);
});

function userInfo(user) {
    // console.log(user);
    // console.log(user.image);
}

function comments(comment) {
    console.log(comment);
    for(let i=0;i<comment.length;i++) {
        let usr = comment[i].user;
        console.log(usr);
        let image = usr.image;
        elm(comment[i].score,image.png,usr.username,comment[i].createdAt,comment[i].content,false);
        let replies = comment[i].replies;
        console.log(replies);
        for(let i=0;i<replies.length;i++) {
            console.log(replies[i]);
            let r_usr = replies[i].user;
            let r_img = r_usr.image;
            elm(replies[i].score,r_img.png,r_usr.username,replies[i].createdAt,replies[i].content,true);
        }
    }
}

function elm(score,source,usrname,time,content,is_reply) 
{
    let main_div = document.createElement('div'); 
    main_div.classList.add('container__content');
    if(is_reply) {
        main_div.classList.add('reply');
    }
    /// score section
    {
    let div = document.createElement('div');
    div.classList.add('container__content-rating');
    let img = document.createElement('img');
    img.src="./images/icon-plus.svg";
    div.appendChild(img);
    let p = document.createElement('p');
    p.id =  'rating';
    p.innerHTML = score;
    div.appendChild(p);
    let img2 = document.createElement('img');
    img2.src="./images/icon-minus.svg";
    div.appendChild(img2);
    main_div.appendChild(div);
    }

    //profile image section
    {
        let div = document.createElement('div');
        div.classList.add('container__content-img');
        let img = document.createElement('img');
        img.src= source;
        div.appendChild(img);
        main_div.appendChild(div);
    }

    //user name section

    {
        let div = document.createElement('div');
        div.classList.add('container__content-name');
        let p = document.createElement('p');
        p.id =  'user-name';
        p.innerHTML = usrname;
        div.appendChild(p);
        main_div.appendChild(div);
    }


    //time section
    
    {
        let div = document.createElement('div');
        div.classList.add('container__content-time');
        let p = document.createElement('p');
        p.id =  'time';
        p.innerHTML = time;
        div.appendChild(p);
        main_div.appendChild(div); 
    }

    //replay

    {
        let div = document.createElement('div');
        div.classList.add('container__content-replay');
        let img = document.createElement('img');
        img.src= "./images/icon-reply.svg";
        let p = document.createElement('p');
        p.innerHTML = "Replay";
        div.appendChild(img);
        div.appendChild(p);
        main_div.appendChild(div);
    }

    // comment 

    {
        let div = document.createElement('div');
        div.classList.add('container__content-comment');
        let p = document.createElement('p');
        p.id =  'comment';
        p.innerHTML = content;
        div.appendChild(p);
        main_div.appendChild(div);
    }

    document.getElementsByClassName('container')[0].appendChild(main_div);
}