document.addEventListener("DOMContentLoaded", function () {
    fetch('alunos.xml')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
  
        let notasAlunos = "";
  
        xml.querySelectorAll("curso").forEach(curso => {
          notasAlunos += <h3>${curso.getAttribute("nome")}</h3><ul>;
  
          curso.querySelectorAll("aluno").forEach(aluno => {
            const nome = aluno.querySelector("nome").textContent;
            const notas = [...aluno.querySelectorAll("notas > *")].map(n => parseFloat(n.textContent));
            const media = notas.reduce((sum, n) => sum + n, 0) / notas.length;
  
            let status = "";
            let cor = "";
  
            if (media >= 7) {
              status = "Aprovado";
              cor = "blue";
            } else if (media >= 5) {
              status = "Recuperação";
              cor = "yellow";
            } else {
              status = "Reprovado";
              cor = "red";
            }
  
            notasAlunos += <li style="color:${cor};">${nome}: Média ${media.toFixed(2)} - ${status}</li>;
          });
  
          notasAlunos += "</ul>";
        });
  
        document.getElementById("notasAlunos").innerHTML = notasAlunos;
      });
  });
