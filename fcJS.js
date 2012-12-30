/*
    Plugin jQuery que permite filtrar datos por columnas en
    una tabla por medio de atributos HTML o JavaScript.

    Versión  : 1.0
    Autor    : Carlos Alberto Castaño
    Fecha    : 20 diciembre 2012
    Sitio web: http://www.calbertts.com/codigo/proyecto/fcjs
    
    GNU General Public License
*/

(function($) {
    $.fn.fcJS = function(options) {
        return this.each(function() {

            var $this = $(this);    // Objeto que hace referencia a la tabla
            var coln = 1;           // Indica la columna que se evalúa en un instante

            // Opciones por defecto
            var settings = $.extend( {
                'inputFilter' : 'all',
                'inputType'   : 'text',
                'inputEvent'  : 'keyup',
                'inputCase'   : 'false',
                'inputNewLine': 'false',
                'inputClass'  : '',
                'inputStyle'  : '',
                'efect'       : 'true',
                'efectType'   : 'fast'
            }, options);

            // Adicionar campos de búsqueda a los heads automáticamente
            // o a la columna especificada en inputFilter
            $this.find('thead > tr > th').each(function(){
                if($(this).text() === settings.inputFilter || settings.inputFilter === 'all'){
                    $(this).append(((settings.inputNewLine == 'true') ? '<br>' : '')+'<input type="'+settings.inputType+'" class="'+settings.inputClass+'" style="'+settings.inputStyle+'" />');
                    $(this).find('input').on(settings.inputEvent, {column: coln}, filter);
                }

                coln++;
            });

            // Mostrar todas las filas
            function showAll(){
                $this.find('tbody > tr').each(function(){
                    if(settings.efect == 'true')
                        $(this).fadeIn(settings.efectType);
                    else
                        $(this).show();
                });
            }

            // Filtrar las filas según de los parámetros
            function filtre(col, valor){
                var colu = col;

                $this.find('tbody > tr').each(function(){
                    var columnVal = $(this).find("td:nth-child("+colu+")").text();

                    if(settings.inputCase === 'false'){
                        columnVal = columnVal.toLowerCase();
                        valor = valor.toLowerCase();
                    }

                    if(columnVal.search(valor) < 0){
                        if(settings.efect == 'true')
                            $(this).fadeOut(settings.efectType);
                        else
                            $(this).hide();
                    } else{
                        if(settings.efect == 'true')
                            $(this).fadeIn(settings.efectType);
                        else
                            $(this).show();
                    }
                });
            }

            // Ejecutar la acción de filtrar o mostrar todo según los parámetros
            function filter(e){
                if($(this).val() === ""){
                    showAll();
                } else{
                    filtre(e.data.column, $(this).val());
                }
            }
        });
    };
})(jQuery);


// Instalación del filtro a todas las tablas con atributos data personalizados
$(function(){
    var tablas = $('table[data-filter=true]');

    tablas.fcJS({
        inputEvent  : tablas.attr('data-inputEvent'),
        inputFilter : tablas.attr('data-inputFilter'),
        inputStyle  : tablas.attr('data-inputStyle'),
        inputClass  : tablas.attr('data-inputClass'),
        inputType   : tablas.attr('data-inputType'),
        inputCase   : tablas.attr('data-inputCase'),
        inputNewLine: tablas.attr('data-inputNewLine'),
        efect       : tablas.attr('data-efect'),
        efectType   : tablas.attr('data-efectType')
    });
});
