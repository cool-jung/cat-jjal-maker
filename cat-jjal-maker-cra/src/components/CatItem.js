function CatItem(props){
    console.log(props); //타이틀안에 있는 글씨는 children으로 넘어온다.
    return (
        <li>
            <img src={props.img} style={{width: "150px"}}/>
        </li>
    );
}

export default CatItem;