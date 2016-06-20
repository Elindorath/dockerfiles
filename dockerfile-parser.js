'use strict';

module.exports = {
  parse: parse,
};

var TOKEN = {
  WHITESPACE       : /[ \t\v\f\r]+/,
  LINE_CONTINUATION: /\\[ \t]+$/,
};

var instructionParsers = {
  'FROM'      : parseFrom,
  'MAINTAINER': parseString,
  // 'RUN'       :
  // 'CMD'       :
  // 'LABEL'     :
  // 'EXPOSE'    :
  // 'ENV'       :
  // 'ADD'       :
  // 'COPY'      :
  // 'ENTRYPOINT':
  // 'VOLUME'    :
  // 'USER'      :
  // 'WORKDIR'   :
  // 'ARG'       :
  // 'ONBUILD'   :
  // 'STOPSIGNAL':
};

/*
 * options = {
 *   includeComments: boolean,
 *   keepLineReturn: boolean,
 * }
 */
function parse(dockerfile, options) {
  var lines = dockerfile.split(/[\r?\n]/);

  console.log(lines);

  for (var i = 0, len = lines.length; i < len; i++) {
    lines[i] = lines[i].trim();

    if (!lines[i])
      console.log('EMPTY');
    else if (lines[i][0] === '#')
      console.log('COMMENTS');
    else
      parseInstruction(lines, i);
  }
}

/*
 * return instruction = {
 *   name: string,
 *   args: [string],
 *   lineno: number,
 *   endline: number
 * }
 *
 * instruction[argName] = string
 */
function parseInstruction(lines, i) {
  var splitted = lines[i].split(/\s(.+)/);
  var instruction = {};

  instruction.name = splitted[0];
  instruction.lineno = i + 1;
  instruction.rest = parseRest(lines, i);
}

function parseRest(lines, i);

function cleanStr(str) {
  return str
      .replace(/(\\"|"(?:\\"|[^"])*")|(\s+)/g, function(m, $1) {
        if ($1)
          return $1;
        return ' ';
      });
}

function parseFrom(instruction) {
  var delimiter;
  var name;
  var command = null;
  var splitted = [];

  if (instruction.rest.indexOf(':')) {
    delimiter = ':';
    name = 'tag';
  } else if (instruction.rest.indexOf('@')) {
    delimiter = '@';
    name = 'digest';
  }

  splitted = instruction.rest.split(delimiter);

  command = {
    name : 'FROM',
    args : [instruction.rest],
    image: splitted[0],
  };

  if (delimiter)
    command[name] = splitted[1];

  return command;
}

function parseString(instruction) {
  return instruction;
}

function parseRun(instruction) {
  // if (instruction.rest[0] === '[')
}
