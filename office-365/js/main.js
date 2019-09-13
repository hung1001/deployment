"use strict";
window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments)
}

var lazy = () => {
  gtag('js', new Date());
  gtag('config', 'UA-113310556-1');
}

window.onload = lazy;

(function(d) {

  const df = '    </Add>\n    <Display Level="Full" AcceptEULA="TRUE"/>\n    <Property Name="AUTOACTIVATE" Value="1"/>\n    <Property Name="FORCEAPPSHUTDOWN" Value="TRUE"/>\n    <Property Name="SharedComputerLicensing" Value="0"/>\n    <Property Name="PinIconsToTaskbar" Value="TRUE"/>\n    <Updates Enabled="TRUE" />\n    <Property Name="SCLCacheOverride" Value="0"/>\n    <RemoveMSI All="TRUE"/>\n';

  var id = id => {
    return d.getElementById(id);
  }

  var cl = cl => {
    return d.getElementsByClassName(cl);
  }

  var name = name => {
    return d.getElementsByName(name);
  }

  var expanded = false;

  var showBox = id => {
    let $checkboxes = $("#" + id);
    if (!expanded) {
      $checkboxes.slideDown('fast');
      expanded = true;
    } else {
      $checkboxes.slideUp('fast');
      expanded = false;
    }
  }

  id("s1").addEventListener("click", e => {
    e.preventDefault(), showBox("b1")
  })
  id("s2").addEventListener("click", e => {
    e.preventDefault(), showBox("b2")
  })
  id("s3").addEventListener("click", e => {
    e.preventDefault(), showBox("b3")
  })
  id("s4").addEventListener("click", e => {
    e.preventDefault(), showBox("b4")
  })
  id("s5").addEventListener("click", e => {
    e.preventDefault(), showBox("b5")
  })

  var hideBox = id => {
    $("#" + id).slideUp('fast');
  }

  id("h1").addEventListener("click", () => {
    hideBox("b1")
  })
  id("h2").addEventListener("click", () => {
    hideBox("b2")
  })
  id("h3").addEventListener("click", () => {
    hideBox("b3")
  })
  id("h4").addEventListener("click", () => {
    hideBox("b4")
  })
  id("h5").addEventListener("click", () => {
    hideBox("b5")
  })

  window.editor = CodeMirror.fromTextArea(id("config"), {
    lineNumbers: true,
    lineWrapping: true,
    mode: "htmlmixed"
  })

  var destroyClickedElement = e => document.body.removeChild(e.target);

  var saveTextAsFile = id => {
    if (id.length != 0) {
      let textToSaveAsBlob = new Blob([id], {
        type: "text/plain"
      });
      let fileNameToSaveAs = "configuration.xml";
      let downloadLink = d.createElement("a");
      downloadLink.download = fileNameToSaveAs;
      downloadLink.innerHTML = "Download File";
      if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textToSaveAsBlob);
      } else {
        downloadLink.href = window.URL.createObjectURL(textToSaveAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        d.body.appendChild(downloadLink);
      }
      downloadLink.click();
    } else {
      alert('configuration.xml is invalid !');
    }
  }

  id("sf1").addEventListener("click", () => {
    saveTextAsFile(window.editor.getDoc().getValue())
  })

  id("b3").appendChild(cl("cl-2")[0].cloneNode(true));
  id("b4").appendChild(cl("cl-2")[0].cloneNode(true));
  id("b5").appendChild(cl("cl-2")[0].cloneNode(true));

  let oid = {
    a: id("Access"),
    e: id("Excel"),
    g: id("Groove"),
    l: id("Lync"),
    o: id("OneDrive"),
    n: id("OneNote"),
    k: id("Outlook"),
    p: id("PowerPoint"),
    s: id("Publisher"),
    w: id("Word"),
  }

  let pp = id("project"),
    vp = id("visio"),
    ps = id("projectstd"),
    vs = id("visiostd"),
    result = "";

  id("gr1").addEventListener("click", () => {
    let count = 0;
    for (let i in oid) {
      if (oid[i].checked) {
        count++;
      }
    }
    if (count == 0) {
      alert('Please choose minimize 1 app to install');
      return;
    } else {
      window.editor.getDoc().setValue("");
      let radios = name("ed"),
        radios1 = name("pt"),
        radios2 = name("cn"),
        radios3 = name("vr");

      for (let i = 0; i < radios1.length; i++) {
        for (let j = 0; j < radios2.length; j++) {
          if (radios1[i].checked && radios2[j].checked) {
            result += `<Configuration>\n    <Add OfficeClientEdition="${radios1[i].value}" Channel="${radios2[j].value}" AllowCdnFallback="TRUE" ForceUpgrade="TRUE">\n`;
            break;
          }

        }
      }
      for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          result += `        <Product ID="${radios[i].value}">\n`;
          break;
        }
      }
      let c1 = d.querySelectorAll("#b1 input[type='checkbox']"),
        flag_1 = false;;
      for (let i = 0; i < c1.length; i++) {
        if (c1[i].checked) {
          result += `            <Language ID="${c1[i].value}"/>\n`;
          flag_1 = true;
        }
      };
      if (!flag_1) {
        result += `            <Language ID="MatchOS"/>\n`;
      };
      if (!oid.a.checked) result += `            <ExcludeApp ID="Access"/>\n`;
      if (!oid.e.checked) result += `            <ExcludeApp ID="Excel"/>\n`;
      if (!oid.g.checked) result += `            <ExcludeApp ID="Groove"/>\n`;
      if (!oid.l.checked) result += `            <ExcludeApp ID="Lync"/>\n`;
      if (!oid.o.checked) result += `            <ExcludeApp ID="OneDrive"/>\n`;
      if (!oid.n.checked) result += `            <ExcludeApp ID="OneNote"/>\n`;
      if (!oid.k.checked) result += `            <ExcludeApp ID="Outlook"/>\n`;
      if (!oid.p.checked) result += `            <ExcludeApp ID="PowerPoint"/>\n`;
      if (!oid.s.checked) result += `            <ExcludeApp ID="Publisher"/>\n`;
      if (!oid.w.checked) result += `            <ExcludeApp ID="Word"/>\n`;
      result += '        </Product>\n';
      let p = false;
      var u = (b, c, f) => {
        let g = false,
          w = true,
          e = id(b).value.replace(/ /g, ""),
          pid = /^[0-9a-zA-Z]{5}-[0-9a-zA-Z]{5}-[0-9a-zA-Z]{5}-[0-9a-zA-Z]{5}-[0-9a-zA-Z]{5}$/;
        for (let i = 0; i < radios3.length; i++) {
          if (radios3[i].checked) {
            if (e.length == 29) {
              if (!pid.test(e)) {
                w = false;
              }
              if (w) {
                result += `        <Product ID="${c}${radios3[i].value}Retail" PIDKEY="${e}">\n`;
              } else {
                alert(`Product key ${id(b).value} is invalid`);
                p = true;
              }
            } else if (e.length == 0) {
              result += `        <Product ID="${c}${radios3[i].value}Retail">\n`;
            } else {
              alert(`Product key ${id(b).value} is invalid`);
              p = true;
            }
          }
        }

        let c2 = d.querySelectorAll(`#${f} input[type=checkbox]`);
        for (let i = 0; i < c2.length; i++) {
          if (c2[i].checked) {
            result += `            <Language ID="${c2[i].value}"/>\n`;
            g = true;
          }
        };
        if (!g) {
          result += `            <Language ID="MatchOS"/>\n`;
        };
        result += `        </Product>\n`;
      }

      let ex = {
        do: (a, b, c, d) => {
          if (a.checked) {
            for (let i = 0; i < radios.length; i++) {
              (radios[i].checked) && u(b, c, d);
            }
          }
        },
        project: function() {
          this.do(pp, "kProject", "ProjectPro", "b2");
        },
        visio: function() {
          this.do(vp, "kVisio", "VisioPro", "b3");
        },
        projectstd: function() {
          this.do(ps, "kProjectStd", "ProjectStd", "b4");
        },
        visiostd: function() {
          this.do(vs, "kVisioStd", "VisioStd", "b5");
        }
      }
      ex.project();
      ex.visio();
      ex.projectstd();
      ex.visiostd();

      result += df;
      result += `</Configuration>`;
      if (p) {
        result = "";
        return;
      }
      window.editor.getDoc().setValue(result);
      result = '';
    }
  });

  var checkbox = (a, b) => {
    id(a).addEventListener("change", e => {
      if (e.currentTarget.checked) {
        id(b).setAttribute("disabled", "disabled");
      } else {
        id(b).removeAttribute("disabled");
      }
    })
  }

  checkbox("visio", "visiostd")
  checkbox("visiostd", "visio")
  checkbox("project", "projectstd")
  checkbox("projectstd", "project")

  var disabled = (selector, flag) => {
    let x = d.querySelectorAll(selector);
    for (let j = 0; j < x.length; j++) {
      if (x[j].checked) {
        x[j].checked = false;
      }
      if (flag) {
        x[j].setAttribute("disabled", "disabled")
      };
    };

  }

  var removeDisabled = selector => {
    let x = d.querySelectorAll(selector);
    for (let j = 0; j < x.length; j++) {
      x[j].removeAttribute("disabled");
    };
  }
  let ip = d.querySelectorAll("input[type=radio][name=ed]");
  for (let i = 0; i < ip.length; i++) {
    ip[i].addEventListener("change", (e) => {
      switch (e.currentTarget.value) {
        case "O365HomePremRetail":
          {
            disabled("#Groove,#Lync,#OneDrive,#OneNote", true);
            removeDisabled("#Access,#Publisher");
          }
          break;
        case "O365BusinessRetail":
          {
            disabled("#Groove,#Lync,#OneDrive,#Publisher", true);
            removeDisabled("#Access,#OneNote");
          }
          break;
        case "O365PersonalRetail":
          {
            disabled("#Access,#Lync,#Groove,#Publisher", true);
            removeDisabled("#OneDrive,#OneNote");
          }
          break;
        default:
          {
            removeDisabled("#Access,#Lync,#Groove,#Publisher,#OneDrive,#OneNote");
          }
          break;
      }

    });
  };
  id("rs1").addEventListener("click", () => {
    window.editor.getDoc().setValue("");
    let x = d.querySelectorAll("#key-group input[type=text]");
    for (let i = 0; i < x.length; i++) {
      x[i].value = "";
    };
    id("rad").checked = true;
    id("rad1").checked = true;
    id("rad2").checked = true;
    id("rad3").checked = true;
    id("b1").style.display = "none";
    id("b2").style.display = "none";
    id("b3").style.display = "none";
    id("b4").style.display = "none";
    id("b5").style.display = "none";

    let p = d.querySelectorAll("input[type=checkbox],#project,#visio,#projectstd,#visiostd,.ct");
    for (let j = 0; j < p.length; j++) {
      p[j].removeAttribute("disabled");
      p[j].checked = false;
    };
  });

  id("ct").addEventListener("click", () => {
    let x = cl("ct");
    for (let i = 0; i < x.length; i++) {
      if (x[i].getAttribute("disabled") != "disabled") {
        x[i].checked = true;
      }
    };
  });

  var check = (a, b) => {
    let x = cl(a);
    for (let i = 0; i < x.length; i++) {
      x[i].checked = b;
    };
  }
  id("ut").addEventListener("click", () => {
    check("ct", false)
  })

  var b = id => {
    if (id.length > 0) {
      let t = d.createElement("input");
      d.body.appendChild(t);
      t.setAttribute("id", "tmp");
      d.getElementById("tmp").value = id;
      t.select();
      d.execCommand("copy");
      d.body.removeChild(t);
      alert("Copied !")
    } else {
      alert("Nothing to copy !")
    }
  }
  id("cp1").addEventListener("click", () => {
    b(window.editor.getDoc().getValue());
  })

  var save = (file, data) => {
    let textToSaveAsBlob = new Blob([data], {
      type: "text/plain"
    });
    let downloadLink = d.createElement("a");
    downloadLink.download = file;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
      downloadLink.href = window.webkitURL.createObjectURL(textToSaveAsBlob);
    } else {
      downloadLink.href = window.URL.createObjectURL(textToSaveAsBlob);
      downloadLink.onclick = event => {
        d.body.removeChild(event.target);
      };
      downloadLink.style.display = "none";
      d.body.appendChild(downloadLink);
    }
    downloadLink.click()
  }
  id("d1").addEventListener("click", () => {
    $.get("bat/download-and-install.txt", data => {
      save("install.bat", data)
    });
  })
  id("d2").addEventListener("click", () => {
    $.get("bat/download.txt", data => {
      save("download.bat", data)
    });
  })
}(document));
