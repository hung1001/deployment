SyntaxHighlighter.all();

function saveTextAsFile() {
    var textToSave = document.getElementById("config").value;
    var textToSaveAsBlob = new Blob([textToSave], { type: "text/plain" });
    var fileNameToSaveAs = "configuration.xml";
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textToSaveAsBlob);
    } else {
        downloadLink.href = window.URL.createObjectURL(textToSaveAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

var expanded = false;

function showCheckboxes(id) {
    var checkboxes = document.getElementById(id);
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

var x1 = document.getElementById("checkAccess"),
    x2 = document.getElementById("checkExcel"),
    x3 = document.getElementById("checkGroove"),
    x4 = document.getElementById("checkLync"),
    x5 = document.getElementById("checkOneDrive"),
    x6 = document.getElementById("checkOneNote"),
    x7 = document.getElementById("checkOutlook"),
    x8 = document.getElementById("checkPowerPoint"),
    x9 = document.getElementById("checkPublisher"),
    x10 = document.getElementById("checkWord"),
    x11 = document.getElementById("project"),
    x12 = document.getElementById("visio"),
    result = "";

$(document).ready(function() {

    new ClipboardJS('#copy-config');

    var t = $("#BackToTop");
    $(window).scroll(function() {
        $(this).scrollTop() >= 200 ? t.show(10).animate("#BackToTop").addClass("active") : t.animate("#BackToTop").removeClass("active")
    });
    t.click(function(t) {
        t.preventDefault();
        $("html,body").animate({
            scrollTop: 0
        }, 800)
    })

    $("#generator").click(function() {
        if (!x1.checked && !x2.checked && !x3.checked && !x4.checked && !x5.checked && !x6.checked && !x7.checked && !x8.checked && !x9.checked && !x10.checked) {
            alert('Please choose minimize 1 apps to install');
        } else {
            $("#config").val('');
            var radios = document.getElementsByName("edition"),
                radios1 = document.getElementsByName("platform"),
                radios2 = document.getElementsByName("channel"),
                langproplus = document.getElementById("sel"),
                langproject = document.getElementById("sel1"),
                langvisio = document.getElementById("sel2"),
                key1 = document.getElementById("key19Pro").value,
                key2 = document.getElementById("key19Project").value,
                key3 = document.getElementById("key19Visio").value;

            for (var i = 0; i < radios1.length; i++) {
                for (var j = 0; j < radios2.length; j++) {
                    if (radios1[i].checked) {
                        if (radios2[j].checked) {
                            result += '<Configuration>\n    <Add OfficeClientEdition="' + radios1[i].value + '" Channel="' + radios2[j].value + '">\n';
                            break;
                        }

                    }
                }

            }

            for (var i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    if ($('#key19Pro').val().length > 0) {
                        result += '        <Product ID="' + radios[i].value + '" PIDKEY="' + key1 + '">\n';
                        break;
                    } else {
                        result += '        <Product ID="' + radios[i].value + '">\n';
                        break;
                    }
                }
            }

            var flag_1 = flag_2 = flag_3 = false;

            $('#checkboxes-1 input[type=checkbox]').each(function() {
                if (this.checked) {
                    result += '            <Language ID="' + $(this).val() + '"/>\n';
                    flag_1 = true
                }
            });

            if (!flag_1) {
                result += '            <Language ID="en-us"/>\n';
            };

            if (!x1.checked) result += '            <ExcludeApp ID="Access"/>\n';
            if (!x2.checked) result += '            <ExcludeApp ID="Excel"/>\n';
            if (!x3.checked) result += '            <ExcludeApp ID="Groove"/>\n';
            if (!x4.checked) result += '            <ExcludeApp ID="Lync"/>\n';
            if (!x5.checked) result += '            <ExcludeApp ID="OneDrive"/>\n';
            if (!x6.checked) result += '            <ExcludeApp ID="OneNote"/>\n';
            if (!x7.checked) result += '            <ExcludeApp ID="Outlook"/>\n';
            if (!x8.checked) result += '            <ExcludeApp ID="PowerPoint"/>\n';
            if (!x9.checked) result += '            <ExcludeApp ID="Publisher"/>\n';
            if (!x10.checked) result += '            <ExcludeApp ID="Word"/>\n';
            result += '        </Product>\n';

            if (x11.checked) {
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        if (radios[i].value == "ProPlus2019Retail") {
                            if ($('#key19Project').val().length > 0) {
                                result += '        <Product ID="ProjectPro2019Retail" PIDKEY="' + key2 + '">\n';

                                $('#checkboxes-2 input[type=checkbox]').each(function() {
                                    if (this.checked) {
                                        result += '            <Language ID="' + $(this).val() + '"/>\n';
                                        flag_2 = true
                                    }
                                });

                                if (!flag_2) {
                                    result += '            <Language ID="en-us"/>\n';
                                };

                                result += '        </Product>\n';
                            } else {
                                result += '        <Product ID="ProjectPro2019Retail">\n';

                                $('#checkboxes-2 input[type=checkbox]').each(function() {
                                    if (this.checked) {
                                        result += '            <Language ID="' + $(this).val() + '"/>\n';
                                        flag_2 = true
                                    }
                                });

                                if (!flag_2) {
                                    result += '            <Language ID="en-us"/>\n';
                                };

                                result += '        </Product>\n';
                            }
                        } else {
                            if ($('#key19Project').val().length > 0) {
                                result += '        <Product ID="ProjectPro2019Volume" PIDKEY="' + key2 + '">\n';

                                $('#checkboxes-2 input[type=checkbox]').each(function() {
                                    if (this.checked) {
                                        result += '            <Language ID="' + $(this).val() + '"/>\n';
                                        flag_2 = true
                                    }
                                });

                                if (!flag_2) {
                                    result += '            <Language ID="en-us"/>\n';
                                };

                                result += '        </Product>\n';
                            } else {
                                result += '        <Product ID="ProjectPro2019Volume">\n';

                                $('#checkboxes-2 input[type=checkbox]').each(function() {
                                    if (this.checked) {
                                        result += '            <Language ID="' + $(this).val() + '"/>\n';
                                        flag_2 = true
                                    }
                                });

                                if (!flag_2) {
                                    result += '            <Language ID="en-us"/>\n';
                                };

                                result += '        </Product>\n';
                            }
                        }
                    }
                }
            }

            if (x12.checked) {
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        if (radios[i].value == "ProPlus2019Retail") {
                            if ($('#key19Visio').val().length > 0) {
                                result += '        <Product ID="VisioPro2019Retail" PIDKEY="' + key3 + '">\n';

                                $('#checkboxes-3 input[type=checkbox]').each(function() {
                                    if (this.checked) {
                                        result += '            <Language ID="' + $(this).val() + '"/>\n';
                                        flag_3 = true
                                    }
                                });

                                if (!flag_3) {
                                    result += '            <Language ID="en-us"/>\n';
                                };

                                result += '        </Product>\n';
                            } else {
                                result += '        <Product ID="VisioPro2019Retail">\n';

                                $('#checkboxes-3 input[type=checkbox]').each(function() {
                                    if (this.checked) {
                                        result += '            <Language ID="' + $(this).val() + '"/>\n';
                                        flag_3 = true
                                    }
                                });

                                if (!flag_3) {
                                    result += '            <Language ID="en-us"/>\n';
                                };

                                result += '        </Product>\n';
                            }
                        } else {
                            if ($('#key19Visio').val().length > 0) {
                                result += '        <Product ID="VisioPro2019Volume" PIDKEY="' + key3 + '">\n';

                                $('#checkboxes-3 input[type=checkbox]').each(function() {
                                    if (this.checked) {
                                        result += '            <Language ID="' + $(this).val() + '"/>\n';
                                        flag_3 = true
                                    }
                                });

                                if (!flag_3) {
                                    result += '            <Language ID="en-us"/>\n';
                                };

                                result += '        </Product>\n';
                            } else {
                                result += '        <Product ID="VisioPro2019Volume">\n';

                                $('#checkboxes-3 input[type=checkbox]').each(function() {
                                    if (this.checked) {
                                        result += '            <Language ID="' + $(this).val() + '"/>\n';
                                        flag_3 = true
                                    }
                                });

                                if (!flag_3) {
                                    result += '            <Language ID="en-us"/>\n';
                                };

                                result += '        </Product>\n';
                            }
                        }
                    }
                }
            }

            result += '    </Add>\n    <Display Level="Full" AcceptEULA="TRUE"/>\n    <Property Name="AUTOACTIVATE" Value="1"/>\n    <Property Name="FORCEAPPSHUTDOWN" Value="TRUE"/>\n    <Property Name="SharedComputerLicensing" Value="0"/>\n    <Property Name="PinIconsToTaskbar" Value="TRUE"/>\n</Configuration>';
            $("#config").val(result);
            result = '';
        }
    });
});
$("#reset").click(function() {
    $("#config,#key19Visio,#key19Project,#key19Pro").val('');
    $("#rad1,#rad2,#rad3").prop('checked', true);
    $(".checkAllApps,.checkAllApps1").prop('checked', false);
});
$("#checkAllApps").click(function() {
    $(".checkAllApps").prop('checked', true);
});
$("#uncheckAllApps").click(function() {
    $(".checkAllApps").prop('checked', false);
});
$("#checkAllApps1").click(function() {
    $(".checkAllApps1").prop('checked', true);
});
$("#uncheckAllApps1").click(function() {
    $(".checkAllApps1").prop('checked', false);
});