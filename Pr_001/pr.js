class Answer {
    constructor(answer,valid) {
        this.answer = answer;
        this.valid  = valid;
    }
}

class Viktorina {
    answer =[]
    constructor(text_answer, ...arg) {
        this.text_answer=text_answer;
        for (let i = 0; i < arg.length; i++) {
            this.answer.push(arg[i])
        }        

        this.answer.sort(function(){
            return Math.random() - 0.5;
          });        
    }

    getChild() {
        let elem_div = document.createElement('div');
        let elem_p = document.createElement('p');
        elem_p.innerHTML=this.text_answer;
        elem_div.appendChild(elem_p)

        this.answer.forEach(element => {
            let elem_button = document.createElement('button');
            elem_button.classList.add("answer_bt")

            if (element.valid==true) {
                elem_button.setAttribute("yes","1");
            }
                elem_button.addEventListener("click",
                function() {

                    let all_bt = document.querySelectorAll(".answer_bt");
                    all_bt.forEach(element => {
                        element.setAttribute('disabled',true)
                    });

                    let event = new CustomEvent("answer",{detail:{yes: this.hasAttribute("yes")}}); // (2)
                    elem_div.dispatchEvent(event);

                    if (this.hasAttribute("yes")) {
                        this.style.background = "green"
                    } else {
                        this.style.background = "red"
                    }

                  }
                )
                elem_button.innerText = element.answer;
                elem_div.appendChild(elem_button)
        });


        return elem_div;
    }

}

class ViktorinaList {
    list=[];
    index = 0;
    yes=0;
    no=0;
    constructor(div) {
        this.div = div;
        this.create_score();
    }

    create_score(){
        let elem_div = document.createElement('div');
        elem_div.id = "score";
        let elem_span = document.createElement('span');
        elem_span.id = "yes";
        elem_span.innerHTML="Верно:0 ";
        this.div.appendChild(elem_span)

        elem_span = document.createElement('span');
        elem_span.id = "no";
        elem_span.innerHTML="Не верно:0";
        this.div.appendChild(elem_span)
    }

    update_score(){

        let span_yes=document.querySelector("#yes");
        span_yes.innerHTML="Верно: "+this.yes+" ";
        let span_no=document.querySelector("#no");
        span_no.innerHTML="Не верно: "+this.no+" ";
    }

    add(v) {
        this.list.push(v)
    }

    answer_click(e) {

        if (e.detail.yes) {
            this.yes++;
        } else {
            this.no++;
        }

        console.log(e.detail);
        this.index++;
        // this.div.innerHTML='';
        this.update_score()
        this.Show();
    }    

    Show() {
        if (this.list.length > this.index) {
            let element = this.list[this.index];
            let div = element.getChild();
            div.addEventListener("answer", this.answer_click.bind(this),false)
            this.div.appendChild(div)
        }
    }

}

let div = document.querySelector("#div")

list_v = new ViktorinaList(div)
list_v.add(new Viktorina("Вопрос №1",new Answer("Да",true),new Answer("Нет"),new Answer("Нет"), new Answer("Нет")));
list_v.add(new Viktorina("Вопрос №2",new Answer("Да",true),new Answer("Нет"),new Answer("Нет"), new Answer("Нет")));
list_v.add(new Viktorina("Вопрос №3",new Answer("Да",true),new Answer("Нет"),new Answer("Нет"), new Answer("Нет")));
list_v.add(new Viktorina("Вопрос №4",new Answer("Да",true),new Answer("Нет"),new Answer("Нет"), new Answer("Нет")));
list_v.add(new Viktorina("Вопрос №5",new Answer("Да",true),new Answer("Нет"),new Answer("Нет"), new Answer("Нет")));
list_v.add(new Viktorina("Вопрос №6",new Answer("Да",true),new Answer("Нет"),new Answer("Нет"), new Answer("Нет")));

list_v.Show()



