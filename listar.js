document.addEventListener("DOMContentLoaded", function () {
    fetch('alunos.xml')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
  
        let listaAlunos = "";
  
        xml.querySelectorAll("curso").forEach(curso => {
          listaAlunos += <h3>${curso.getAttribute("nome")}</h3>;
          curso.querySelectorAll("materia").forEach(materia => {
            listaAlunos += <h4>${materia.textContent}</h4><ul>;
            let alunos = [...curso.querySelectorAll("aluno")];
            alunos.sort((a, b) => a.querySelector("nome").textContent.localeCompare(b.querySelector("nome").textContent));
            alunos.forEach(aluno => {
              listaAlunos += <li>${aluno.querySelector("nome").textContent}</li>;
            });
            listaAlunos += "</ul>";
          });
        });
  
        document.getElementById("listaAlunos").innerHTML = listaAlunos;
      });
  });
