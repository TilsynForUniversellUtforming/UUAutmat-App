angular.module('appMain.services')
    .factory('TestSectionService', function()
    {
        var index = 0;
        var sections = [
        {
            name: 'Generell Informasjon',
            type: 'general_info'
        },
        {
            name: 'Virksomhet / Lokale',
            type: 'virksomhet_lokale'
        },
        {
            name: "Oppsummering",
            type: 'overview'
        }];

        function addIndicator(ind)
        {
            sections.splice(sections.length - 1, 0, ind);
        }

        function addTestObject(tobj)
        {
            sections.splice(sections.length - 1, 0, tobj);
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
                type: ''
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
        return {
            addTestObject: addTestObject,
            addIndicator: addIndicator,
            previousSection: previousSection,
            nextSection: nextSection,
            getSections: getSections,
            getSection: getSection,
            getIndex: getIndex
        }
    })