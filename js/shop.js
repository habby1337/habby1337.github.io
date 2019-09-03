function Altro(element) {
    if ($(element).html().indexOf('Cosa vuoi?') > -1) {
        $(element).html('Altro');
    } else {
        $(element).html('<input class=\'form-control\' type=\'text\' placeholder=\'Cosa vuoi?\'>');

        $(element).removeAttr("onclick");
        $(element).removeAttr("data-toggle");
    }
}

function Totale(modalid) {
    var tot = 0;
    var name_array = [];
    var val_array = [];
    $(modalid).find('input[type="checkbox"]:checked').each(function () {
        tot += parseInt($(this).attr("value"));
        var new_push_name = $.trim($(this).parent().parent().parent().find("span").text());
        if (new_push_name == "") {
            name_array.push($(modalid).find("input[type=text]").val());
        } else {
            name_array.push(new_push_name)
        }
        val_array.push($(this).attr("value"));
    });

    $(modalid).find(".modal-title").html("Preventivo")

    $(modalid).find(".modal-body").html(
        '<h5>Il tuo preventivo ammonta circa a:</h5><br> <h4><b>' + tot + '</b> €</h5><br><br><h4><b>Sei interessato?</b></h5>' +
        '<p>Puoi lasciarmi un recapito e ti ricontatterò io, altrimenti puoi usare i moduli qui sotto per approfondire la tua richiesta.</p><br><br>' +
        '<form class="form-group" action="https://formspree.io/contatti@giuseppini.me" method="POST" id="form-' + modalid.substring(1, modalid.length) + '">' +
        '<input type="text" class="form-control" name="nome" placeholder="Nome" required><br><input type="email" class="form-control" name="mail" placeholder="Email" required><br><input type="number" class="form-control" name="telefono" placeholder="Telefono">' +
        '<br><textarea class="form-control" placeholder="Se vuoi scrivere una nota, ben venga. Altrimenti ci penserò io a ricontattarti." rows="3"></textarea>' +
        '<input type="hidden" name="opzsel" value=\'' + JSON.stringify(name_array) + '\'>' +
        '<input type="hidden" name="valsel" value=\'' + JSON.stringify(val_array) + '\'>' +
        '<input type="hidden" name="modalid" value=\'' + modalid.substring(1, modalid.length) + '\'>' +
        '</form>'
    )

    $(modalid).find(".modal-footer").html(
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancella</button>'+
        '<button type="button" class="btn btn-success" onclick="SendForm(\'#form-' + modalid.substring(1, modalid.length) +'\')">Invia</button>'
    )


}

function EnableOtherCheckbox(element) {
    $(element).prop('checked', true);

    if ($(element).attr('disabled')) {
        $(element).removeAttr('disabled');
    } else {
        $(element).attr('disabled', true);
    }
}


function SendForm(formid) {
    $(formid).submit();
}
