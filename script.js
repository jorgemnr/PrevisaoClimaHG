//inicializar
$(document).ready(inicializar);


function inicializar() {
    // Inicia com a previsao por Geo IP, sem passar as coordenadas
    atualizarDados();
    // Quando o usuario clicar no botao, obtem os dados de geolocalizacao do navegador.
    //$('.obter-localizacao').on('click', ObterGeo());    
}

//function atualizarDados(localizacao) {
function atualizarDados() {
    //localizacao = typeof localizacao !== 'undefined' ? localizacao : false;
    $.ajax({
        //url: 'https://cors-escape.herokuapp.com/https://api.hgbrasil.com/weather/?format=json&user_ip=remote',
        //url: 'https://cors-anywhere.herokuapp.com/https://api.hgbrasil.com/weather/?format=json&woeid=455827',
        //url: 'https://api.hgbrasil.com/weather/?format=json&woeid=455827',
        url: 'https://cors.io/?https://api.hgbrasil.com/weather/?format=json&user_ip=remote',
        //url: 'https://api.hgbrasil.com/weather/?format=json&user_ip=remote',
        dataType: 'json',
        success: function (dados) {
            console.log(dados)
            //Loop JSON para atualizar pagina
            $.each(dados.results, function (dado, valor) {
                // Dados do dia corrente
                if (dado !== 'forecast') {
                    if (dado == 'img_id') {
                        //imagem
                        //$('#' + dado).attr('src', 'https://assets.hgbrasil.com/weather/images/' + valor + '.png');
                        $('#' + dado).css('background', 'url(https://assets.hgbrasil.com/weather/images/' + valor + '.png)');
                    }
                    else if (dado == 'condition_slug') {
                        //Cor do dia corrente
                        $('#' + dado).addClass(valor);
                    }
                    else {
                        //demais informações
                        $('#' + dado).text(valor);
                    }
                }
                else {
                    //previsão futura
                    for (let i = 0; i < 3; i++) {
                        $.each(dados.results.forecast[i], function (dadoPrev, valorPrev) {
                            if (dadoPrev == 'condition') {
                                //Cor do dia
                                $('#' + dadoPrev + i).addClass(valorPrev);
                            }
                            else {
                                //demais informações
                                $('#' + dadoPrev + i).text(valorPrev);
                            }
                        });
                    }
                }
            });
        },
        error: function (xhr, status, error) {
            $('#linhaErro').show();
            $('#erro').text("Ocorreu um erro ao obter previsão!");
        }
    });
}

/*
function ObterGeo() {
    // Verifica se o navegador do usuario tem suporte a geolocalizacao
    if (navigator.geolocation) {
        // Se tiver, solicita os dados e atualiza a previsao do tempo pela API
        navigator.geolocation.getCurrentPosition(atualizarDados);
    } else {
        alert('Seu navegador não suporta geolocalização.');
    }
}
*/

/*
function ChamarWsClima() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
            //alert('Sucesso:' + this.statusText)
        }
        else if (this.readyState == 4)
            //alert('Erro: ' + this.statusText)
            console.log('Erro: ' + this.status)
        else
            console.log('readyState: ' + this.readyState)
    };

    try {
        //xhttp.open("GET", "https://api.hgbrasil.com/weather/?format=json&woeid=455903", true);
        xhttp.open("GET", "https://cors-escape.herokuapp.com/https://api.hgbrasil.com/weather/?format=json&woeid=455903", true);
        //xhttp.open("GET", "http://apiadvisor.climatempo.com.br/api/v1/climate/rain/locale/3477?token=0ecb56f4b5f94be7ef19b986c5ee01a3", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');

    } catch (error) {
        console.log('LogErro:' + error.toString())
    }
    xhttp.send();
}

*/


/*
XMLHttpRequest Object Properties
--------------------------------
Property			Description
onreadystatechange	Defines a function to be called when the readyState property changes
readyState			Holds the status of the XMLHttpRequest.
					0: request not initialized 
					1: server connection established
					2: request received 
					3: processing request 
					4: request finished and response is ready
responseText		Returns the response data as a string
responseXML			Returns the response data as XML data
status				Returns the status-number of a request
					200: "OK"
					403: "Forbidden"
					404: "Not Found"
statusText			Returns the status-text (e.g. "OK" or "Not Found")					
*/
