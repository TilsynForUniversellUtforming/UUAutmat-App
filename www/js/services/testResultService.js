angular.module('appMain.services')

.service('TestResultService', function($resource)
{
    var result = getBlank();
    var ready = false;

    function getBlank()
    {
        var a = {
            test:
            {},
            data:
            {
                score:
                {
                    score: 0,
                    max_score: 0
                },
                test_objects: [],
                indicators: []
            }
        }
        return a;
    }

    function prepareResults(temp, inds, tobjs)
    {
        result = getBlank();
        result.test = temp;
        for (let i = 0; i < inds.length; i++)
        {
            var ind = prepareIndicator(inds[i]);
            console.log("working on ind: " + ind.name)
            result.data.score.score += ind.score;
            result.data.score.max_score = ind.max_score;
            result.data.indicators.push(ind);
        }
        for (let j = 0; j < tobjs.length; j++)
        {
            var tobj = prepareTestObject(tobjs[j]);
            console.log("working on rest object: " + tobj.name)
            result.data.test_objects.push(tobj);
        }

        ready = true;
    }

    function getResults()
    {
        return result;
    }

    function saveResults()
    {
        if (!ready)
        {
            console.log("not ready");
            return;
        }
        var res = {
            msg: ''
        };
        // ready = false;
        getResource().save(result, function(resp, headers)
        {
            console.log(resp);
            console.log("all good")
            result = getBlank();
            res.msg = "OK";

        }, function(err)
        {
            console.log("an error!")
            console.log(err)
            res.msg = "Error";
        })
        return res;
    }

    function prepareTestObject(obj)
    {
        var testObj = {
            id: obj._id,
            name: obj.name,
            properties: [],
            created_at: obj.created_at
        }
        for (let i = 0; i < obj.properties.length; i++)
        {
            var prop = prepareInput(obj.properties[i])
            testObj.properties.push(prop);
        }
        return testObj;

    }

    function prepareIndicator(ind)
    {
        var indRes = {
            id: ind._id,
            comment: ind.comment,
            score: 0,
            max_score: ind.max_score,
            name: ind.name,
            activities: []

        };
        for (let i = 0; i < ind.activities.length; i++)
        {
            var a = ind.activities[i];
            var actRes = {
                text: a.text,
                description: a.description,
                max_score: a.points,
                score: 0,
                inputs: []
            };
            for (let j = 0; j < a.inputs.length; j++)
            {
                var inp = prepareInput(a.inputs[j])
                actRes.score += inp.score;
                actRes.inputs.push(inp);
            }
            indRes.activities.push(actRes);
            indRes.score += actRes.score;
        }
        return indRes;
    }

    function prepareInput(inp)
    {
        var input = {
            text: inp.text,
            max_score: inp.points,
            score: 0,
            type: inp.type,
            subtype: inp.subtype,
            data: inp.data,
            pictureUrl: inp.pictureUrl,
            mandytory: inp.mandytory,
            solution:
            {},
            completed: true
        }
        switch (inp.type)
        {
            case 'yesno':
                input.solution.yes_no = inp.solution.yes_no;
                input.answer = inp.answer;
                var t;
                if (inp.solution.yes_no === 'no')
                {
                    t = false;
                }
                else
                {
                    t = true;
                }
                if (input.answer === t)
                {
                    input.score = input.max_score;

                }
                else if (input.answer === null)
                {
                    input.completed = false;
                }
                break;
            case 'numeric':
                input.answer = inp.answer;
                if (inp.subtype === "any")
                {
                    input.score += inp.points;
                }
                else if (inp.subtype === "one")
                {
                    input.solution.value = inp.solution.value;
                    if (input.answer === inp.solution.value)
                    {
                        //correct
                        input.score += inp.points;
                    }
                    if (input.answer === null)
                    {
                        input.completed = false;
                    }
                }
                else if (inp.subtype === "range")
                {
                    input.solution.min = inp.solution.value;
                    input.solution.max = inp.solution.rangeMax;
                    if (input.answer >= input.solution.min && input.answer <= input.solution.max)
                    {
                        input.score += inp.points;
                    }
                    if (input.answer === null)
                    {
                        input.completed = false;
                    }
                }
                else if (inp.subtype === "lessThan")
                {
                    input.solution.max = inp.solution.rangeMax;
                    if (input.answer <= input.solution.max)
                    {
                        input.score += inp.points;
                    }
                    if (input.answer === null)
                    {
                        input.completed = false;
                    }
                }
                else if (inp.subtype === "moreThan")
                {
                    input.solution.min = inp.solution.value;
                    if (input.answer >= input.solution.min)
                    {
                        input.score += inp.points;
                    }
                    if (input.answer === null)
                    {
                        input.completed = false;
                    }
                }
                else
                {
                    console.log = "Something went wrong while preparing numeric input type.";
                }
                break;
            case 'freetext':
            case 'text':
                //TODO
                //if solution is avaiable, compare and add points. 
                //If no solution, just add points?
                input.answer = inp.answer;
                if (input.answer === null)
                {
                    input.completed = false;
                }
                else if (inp.solution.regex !== null)
                {
                    var isValid = true;
                    try
                    {
                        new RegExp(inp.solution.regex);
                        input.solution.regex = inp.solution.regex;
                    }
                    catch (e)
                    {
                        isValid = false;
                        input.solution.regex = "INVALID";
                    }
                }
                //check if text solution is available
                else if (inp.solution.text.length !== null)
                {
                    input.solution.text = inp.solution.text;
                    //DO somecamparison here
                }
                break;
            case 'radio':
            case 'checkbox':
                for (let i = 0; i < inp.alternatives.length; i++)
                {
                    // count total points earned
                    if (inp.alternatives[i].selected === inp.alternatives[i].corrent)
                    {
                        input.score += inp.alternatives[i].points;
                    }
                }
                var alternatives = inp.alternatives;
                input.alternatives = alternatives;
                break;
            case 'picture':
                //TODO
                //1.check if picture is attatched.
                //2. add points accordingly. 
                //???
                break;
            default:
                console.log("No type, or empty type");
                break;

        }
        return input;
    }

    function getResource()
    {
        return $resource('/api/testResults/:id');
    }
    return {
        getResource: getResource,
        prepareResults: prepareResults,
        getResults: getResults,
        saveResults: saveResults
    }
})