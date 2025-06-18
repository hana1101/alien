let dialogueZib_scene5;

function drawZib5() {
  image(zib5, 0, 0, width, height);

  DialogueBox.maybeReset("dialogueZib_scene5");

  if (!dialogueZib_scene5) {
    let linesZib_scene5 = [
    "DAVE: 나는 Dave,",
    "DAVE: 출근도, 사랑도, 매일 똑같은 하루도 무의미해서 그냥 숨만 쉬고 있는 기분이다"];
    dialogueZib_scene5 = new DialogueBox(10, 500, 980, 120, linesZib_scene5);
  } 

  dialogueZib_scene5.display();

}