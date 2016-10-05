var dods = ["Unit tests written and passing, with code coverage above 70%",
    "Acceptance tests written",
    "Documentation is written and breaking changes are communicated",
    "Passes code review",
    "Code builds, AMI is created and can be successfully deployed to CI environment",
    "Acceptance tests passing in CI environment",
    "Post-deployment checks pass in cog-test",
    "All tasks are completed and marked as done",
    "Demoed to and signed off by Product Owner"
];
var green = "#92FF84";
var red = "#FF8484";

function generateJiraText() {
    var formGroups = document.getElementById("form-dod").getElementsByClassName("form-group");
    var result = "";

    for (var i = 0; i < formGroups.length; ++i) {
        var formGroup = formGroups[i];
        var title = formGroup.getElementsByTagName("label")[0].innerHTML;
        var isChecked = formGroup.getElementsByTagName("input")[0].checked;
        var description = formGroup.getElementsByTagName("textarea")[0].value;

        result += generatePanelText(title, description, isChecked);
    }

    return document.getElementById("output").innerHTML = result;
}

function generatePanelText(title, description, checked) {
    var color = checked ? green : red;

    return "{panel:title=" + title +
        "|borderStyle=dashed|borderColor=#ccc" +
        "|titleBGColor=" + color + "}" +
        description + "{panel}";
}

function populateFromJira() {
    var jiraText = prompt("Enter Jira text");

    if (jiraText != null) {
        var reTitle = /title=([^\\|]*)/g;
        var reColor = /titleBGColor=([^}]*)/g;
        var reDesc = /\{panel:[^}]*}([^}]*)\{panel\}/g;

        var titles = getAttributes(jiraText, reTitle);
        var colors = getAttributes(jiraText, reColor);
        var descs = getAttributes(jiraText, reDesc);

        var formGroups = document.getElementById("form-dod").getElementsByClassName("form-group");
        for (var i = 0; i < formGroups.length; ++i) {
            var formGroup = formGroups[i];
            formGroup.getElementsByTagName("label")[0].innerHTML = titles[i];
            ;
            formGroup.getElementsByTagName("input")[0].checked = colors[i] == green;
            formGroup.getElementsByTagName("textarea")[0].value = descs[i];
        }
    }
}

function getAttributes(text, match) {
    var result = [];

    var m;
    do {
        m = match.exec(text);

        if (m) {
            result.push(m[1]);
        }
    } while (m);

    return result;
}

function populateForm() {
    for (var i = 0; i < dods.length; ++i) {
        var formGroup = createFormGroup(dods[i], "", false);
        document.getElementById("form-dod").appendChild(formGroup);
    }
}

function createFormGroup(title, description, checked) {
    var formGroup = document.createElement("div");
    formGroup.className += "form-group";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    formGroup.appendChild(checkbox);

    var label = document.createElement("label");
    label.innerHTML = title;
    formGroup.appendChild(label);

    var textarea = document.createElement("textarea");
    textarea.value = description;
    textarea.className = "form-control";
    formGroup.appendChild(textarea);

    return formGroup;
}