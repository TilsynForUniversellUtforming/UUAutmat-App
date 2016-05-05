angular.module('appMain.services')
    .factory('TestSectionService', function()
    {
        var index = 0;
        var cheat = 0;
        var inputTypes = [
        {
            name: "yesno",
            url: "templates/partials/inputs/yesno.html"
        },
        {
            name: "radio",
            url: "templates/partials/inputs/radio.html"
        },
        {
            name: "checkbox",
            url: "templates/partials/inputs/checkbox.html"
        },
        {
            name: "freetext",
            url: "templates/partials/inputs/freetext.html"
        },
        {
            name: "text",
            url: "templates/partials/inputs/freetext.html"
        },
        {
            name: "numeric",
            url: "templates/partials/inputs/numeric.html"
        },
        {
            name: "picture",
            url: "templates/partials/inputs/picture.html"
        }];
        var sections = [
        {
            name: 'Generell Informasjon',
            type: 'general_info',
            templateUrl: 'templates/partials/inputGeneralInfo.html'
        },
        {
            name: 'Virksomhet / Lokale',
            type: 'virksomhet_lokale',
            templateUrl: 'templates/partials/inputCompanyInfo.html'
        },
        {
            name: "Oppsummering",
            type: 'overview',
            templateUrl: 'templates/partials/inputOverview.html'
        }];

        function addIndicator(ind)
        {
            sections.splice(sections.length - 1, 0, ind);
        }

        function addTestObject(tobj)
        {
            sections.splice((2 + cheat), 0, tobj);
            cheat++;
        }

        function nextSection()
        {
            if (!(index >= sections.length - 1))
            {
                console.log("next Service " + index)
                index++;
                console.log("next 2  Service " + index)
            }
        }

        function getBlank()
        {
            return {
                name: '',
                type: '',
                templateUrl: ''
            }
        }

        function getSection(ind)
        {
            if (ind < 0 || ind >= sections.length)
            {
                return getBlank();
            }
            return sections[ind];
        }

        function getSections()
        {
            return sections;
        }

        function getIndex()
        {
            return index;
        }

        function previousSection()
        {
            if (!index == 0)
            {
                index--;
            }
        }

        function getInputTypes()
        {
            return inputTypes;
        }
        return {
            getInputTypes: getInputTypes,
            addTestObject: addTestObject,
            addIndicator: addIndicator,
            previousSection: previousSection,
            nextSection: nextSection,
            getSections: getSections,
            getSection: getSection,
            getIndex: getIndex
        }
    })