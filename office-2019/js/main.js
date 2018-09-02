SyntaxHighlighter.all();

function saveTextAsFile(id) {
    var textToSave = document.getElementById(id).value;
    if (textToSave.length != 0) {
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
    } else {
        alert('configuration.xml is invalid !');
    }
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
    result = "",
    result_2 = "";

$(document).ready(function() {

    new ClipboardJS('#copy-config,#copy-config-2');

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
            alert('Please choose minimize 1 app to install');
        } else {
            $("#config").val('');
            var radios = document.getElementsByName("edition"),
                radios1 = document.getElementsByName("platform"),
                radios2 = document.getElementsByName("channel"),
                key1 = document.getElementById("key19Pro").value,
                key2 = document.getElementById("key19Project").value,
                key3 = document.getElementById("key19Visio").value,
                key4 = document.getElementById("key19Std").value,
                key5 = document.getElementById("key19Profesional").value;

            var flag_1 = false;

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
                    if ($('#key19Pro').val().length > 0 && (radios[i].value == "ProPlus2019Retail" || radios[i].value == "ProPlus2019Volume")) {
                        result += '        <Product ID="' + radios[i].value + '" PIDKEY="' + key1 + '">\n';
                        break;
                    } else if ($('#key19Std').val().length > 0 && radios[i].value == "Standard2019Retail") {
                        result += '        <Product ID="' + radios[i].value + '" PIDKEY="' + key4 + '">\n';
                        break;
                    } else if ($('#key19Profesional').val().length > 0 && radios[i].value == "Professional2019Retail") {
                        result += '        <Product ID="' + radios[i].value + '" PIDKEY="' + key5 + '">\n';
                        break;
                    } else {
                        result += '        <Product ID="' + radios[i].value + '">\n';
                        break;
                    }
                }
            }

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

            function a(b, c, d, e, f) {
                var g = false;
                if ($('#' + b).val().length > 0) {
                    result += '        <Product ID="' + c + '2019' + d + '" PIDKEY="' + e + '">\n';

                    $('#' + f + ' input[type=checkbox]').each(function() {
                        if (this.checked) {
                            result += '            <Language ID="' + $(this).val() + '"/>\n';
                            g = true;
                        }
                    });

                    if (!g) {
                        result += '            <Language ID="en-us"/>\n';
                    };

                    result += '        </Product>\n';
                } else {
                    result += '        <Product ID="' + c + '2019' + d + '">\n';

                    $('#' + f + ' input[type=checkbox]').each(function() {
                        if (this.checked) {
                            result += '            <Language ID="' + $(this).val() + '"/>\n';
                            g = true;
                        }
                    });

                    if (!g) {
                        result += '            <Language ID="en-us"/>\n';
                    };

                    result += '        </Product>\n';
                }
            }

            if (x11.checked) {
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        if (radios[i].value == "ProPlus2019Volume") {
                            a("key19Project", "ProjectPro", "Volume", key2, "checkboxes-2");
                        } else {
                            a("key19Project", "ProjectPro", "Retail", key2, "checkboxes-2");
                        }
                    }
                }

            }

            if (x12.checked) {
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        if (radios[i].value == "ProPlus2019Volume") {
                            a("key19Visio", "VisioPro", "Volume", key3, "checkboxes-3");
                        } else {
                            a("key19Visio", "VisioPro", "Retail", key3, "checkboxes-3");
                        }
                    }
                }

            }

            result += '    </Add>\n    <Display Level="Full" AcceptEULA="TRUE"/>\n    <Property Name="AUTOACTIVATE" Value="1"/>\n    <Property Name="FORCEAPPSHUTDOWN" Value="TRUE"/>\n    <Property Name="SharedComputerLicensing" Value="0"/>\n    <Property Name="PinIconsToTaskbar" Value="TRUE"/>\n</Configuration>';
            $("#config").val(result);
            result = '';
        }
    });

    $("#generator-2").click(function() {
        var check = false;
        $('#checkboxes-4 input[type=checkbox]').each(function() {
            if (this.checked) {
                check = true
            }
        })
        if (!check) {
            alert('Please choose minimize 1 app to install');
        } else {
            $("#config-2").val('');
            var rd1 = document.getElementsByName("platform-2"),
                rd2 = document.getElementsByName("channel-2");

            for (var i = 0; i < rd1.length; i++) {
                for (var j = 0; j < rd2.length; j++) {
                    if (rd1[i].checked) {
                        if (rd2[j].checked) {
                            result_2 += '<Configuration>\n    <Add OfficeClientEdition="' + rd1[i].value + '" Channel="' + rd2[j].value + '">\n';
                            break;
                        }

                    }
                }

            }

            function n(a, b) {
                if ($("#" + a).is(':checked')) {
                    if ($("#" + b).val().length > 0) {
                        result_2 += '        <Product ID="' + $("#" + a).val() + '" PIDKEY="' + $("#" + b).val() + '">\n';

                        var u = false;
                        $('#checkboxes-5 input[type=checkbox]').each(function() {
                            if (this.checked) {
                                result_2 += '            <Language ID="' + $(this).val() + '"/>\n';
                                u = true;
                            }
                        });

                        if (!u) {
                            result_2 += '            <Language ID="en-us"/>\n';
                        };

                        result_2 += '        </Product>\n';
                    } else {
                        result_2 += '        <Product ID="' + $("#" + a).val() + '">\n';

                        var u = false;
                        $('#checkboxes-5 input[type=checkbox]').each(function() {
                            if (this.checked) {
                                result_2 += '            <Language ID="' + $(this).val() + '"/>\n';
                                u = true;
                            }
                        });

                        if (!u) {
                            result_2 += '            <Language ID="en-us"/>\n';
                        };
                        result_2 += '        </Product>\n';
                    }
                }
            }

            n("19Word", "key19Word")
            n("19Excel", "key19Excel")
            n("19Access", "key19Access")
            n("19Outlook", "key19Outlook")
            n("19OneNote", "key19OneNote")
            n("19PowerPoint", "key19PowerPoint")
            n("19Publisher", "key19Publisher")
            n("19ProjectPro", "key19ProjectPro")
            n("19VisioPro", "key19VisioPro")
            n("19ProjectStd", "key19ProjectStd")
            n("19VisioStd", "key19VisioStd")

            result_2 += '    </Add>\n    <Display Level="Full" AcceptEULA="TRUE"/>\n    <Property Name="AUTOACTIVATE" Value="1"/>\n    <Property Name="FORCEAPPSHUTDOWN" Value="TRUE"/>\n    <Property Name="SharedComputerLicensing" Value="0"/>\n    <Property Name="PinIconsToTaskbar" Value="TRUE"/>\n</Configuration>';
            $("#config-2").val(result_2);
            result_2 = '';
        }
    });

    function checkbox(a, b) {
        $('#19' + a).change(function() {
            if ($(this).is(':checked')) {
                $("#19" + b).attr("disabled", true);
            } else {
                $("#19" + b).attr("disabled", false);
            }

        })
    }
    checkbox("ProjectPro", "ProjectStd")
    checkbox("VisioPro", "VisioStd")
    checkbox("ProjectStd", "ProjectPro")
    checkbox("VisioStd", "VisioPro")

    $("input[type=radio][name=edition]").on("change", function() {
        if (this.value == 'Professional2019Retail') {
            if ($("#checkGroove,#checkLync").is(':checked')) {
                $("#checkGroove,#checkLync").prop('checked', false);
            }
            $("#checkGroove,#checkLync").attr("disabled", true);
            $("#checkAccess").attr("disabled", false);
        } else if (this.value == "Standard2019Retail") {
            if ($("#checkAccess,#checkGroove,#checkLync").is(":checked")) {
                $("#checkAccess,#checkGroove,#checkLync").prop('checked', false);
            }
            $("#checkAccess,#checkGroove,#checkLync").attr("disabled", true);
        } else {
            $("#checkAccess,#checkGroove,#checkLync").attr("disabled", false);
        }
    });


    $("#reset").click(function() {
        $("#config,#key19Visio,#key19Project,#key19Pro").val('');
        $("#rad1,#rad2,#rad3").prop('checked', true);
        $(".checkAllApps,.checkAllApps1").prop('checked', false);
        $('#checkboxes-1 input[type=checkbox],#checkboxes-2 input[type=checkbox],#checkboxes-3 input[type=checkbox]').each(function() {
            if (this.checked) {
                this.checked = false
            }
        })
        $('#checkboxes-1,#checkboxes-2,#checkboxes-3').each(function() {
            $(this).hide()
        })
        $(".checkAllApps").each(function() {
            $(this).attr("disabled", false);
        });
    });


    $("#reset-2").click(function() {
        $("#config-2").val('');
        $("#rad21,#rad31").prop('checked', true);
        $('#checkboxes-4 input[type=checkbox],#checkboxes-5 input[type=checkbox]').each(function() {
            if (this.checked) {
                this.checked = false
            }
        })
        $('#checkboxes-5').hide();
        $("#key-group input[type=text]").each(function() {
            $(this).val("")
        });
    });

    $("#checkAllApps").click(function() {
        $(".checkAllApps").each(function() {
            if ($(this).attr('disabled') != "disabled") {
                $(this).prop('checked', true);
            }
        });
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
});