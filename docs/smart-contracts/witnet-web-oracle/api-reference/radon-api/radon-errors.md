# RADON Errors

### Unknown

This error indicates that an unknown or unspecified error occurred. The specific details of the error are not provided.

### Decode

This error occurs when there is a failure to decode a type from another type. It suggests that there was an issue converting or interpreting data from one format to another.

### Encode

This error occurs when there is a failure to encode a type into another type. It suggests that there was an issue converting or representing data in a particular format.

### Hash

This error occurs when there is a failure to calculate the hash of a RADON value or structure. Hashing is a process of generating a unique identifier for data, and this error suggests that the hashing operation could not be completed successfully.

### JsonParse

This error occurs when there is a failure to parse an object from a JSON buffer. Parsing involves analyzing the structure of data in a specific format, and this error suggests that the JSON data could not be successfully parsed.

### XmlParse

This error occurs when there is a failure to parse an object from an XML buffer. Parsing XML involves interpreting the XML structure and extracting meaningful information from it, and this error indicates that the parsing process encountered an issue.

### XmlParseOverflow

This error is similar to the `XmlParse` error but specifically indicates that the parsing failed due to a depth overflow. This suggests that the XML structure had nested elements beyond the supported depth.

### ArrayIndexOutOfBounds

This error occurs when the given index is not present in a RadonArray. It suggests that an attempt was made to access an element in an array using an index that is outside the valid range.

### MapKeyNotFound

This error occurs when the given key is not present in a RadonMap. It suggests that an attempt was made to retrieve a value from a map using a key that does not exist in the map.

### ArrayFilterWrongSubscript

This error occurs when the given subscript does not return RadonBoolean in an ArrayFilter. It suggests that the provided subscript in an array filter did not produce a valid Boolean value as expected.

### BufferIsNotValue

This error occurs when there is a failure to parse a Value from a buffer. It suggests that the provided buffer does not contain valid data that can be interpreted as a Value.

### NoOperatorInCompoundCall

This error occurs when there is a failure to parse a Value from a buffer. It suggests that the buffer does not contain the expected operator code in a compound call.

### NoIntegerOperator

This error occurs when the given operator code is not a valid Integer. It suggests that the provided operator code is not recognized or supported as a valid Integer value.

### NoNaturalOperator

This error occurs when the given operator code is not a valid natural number. It suggests that the provided operator code is not recognized or supported as a valid natural number.

### ScriptNotArray

This error occurs when the parsed value was expected to be a script but is not even an Array. It suggests that the parsed value does not conform to the expected structure of a script, which should be represented as an Array.

### UnknownOperator

This error occurs when the given operator code is unknown. It suggests that the provided operator code is not recognized or supported.

### UnknownFilter

This error occurs when the given filter code is unknown. It suggests that the provided filter code is not recognized or supported.

### UnknownReducer

This error occurs when the given reducer code is unknown. It suggests that the provided reducer code is not recognized or supported.

### UnkownRetrieval

This error occurs when the given retrieval code is unknown. It suggests that the provided retrieval code is not recognized or supported.

### UnsupportedHashFunction

This error occurs when the given hash function is not implemented. It suggests that the specified hash function is not supported or available.

### UnsupportedOperator

This error occurs when the given operator is not implemented for the input type. It suggests that the specified operator cannot be applied to the given input data type.

### UnsuppportedReducer

This error occurs when the given reducer is not implemented for the type of the input Array. It suggests that the specified reducer cannot be used with the given type of Array.

### UnsupportedFilter

This error occurs when the given filter is not implemented for the type of the input Array. It suggests that the specified filter cannot be used with the given type of Array.

### UnsupportedSortOp

This error occurs when the sort operator is not implemented for non-string arrays. It suggests that the sort operator can only be applied to arrays of strings and not to other data types.

### UnsupportedOpNonHomogeneous

This error occurs when the operator is not implemented for non-homogeneous arrays. It suggests that the operator can only be applied to arrays where all elements have the same data type.

### UnsupportedOperatorInTally

This error occurs when a reducer cannot be used in the aggregation or tally stage. It suggests that the specified reducer is not supported for use in the current stage of the operation.

### UnsupportedFilterInAT

This error occurs when a reducer cannot be used in the aggregation or tally stage. It suggests that the specified filter is not supported for use in the current stage of the operation.

### ModeTie

This error occurs when there is a tie after applying the mode reducer. The mode reducer is used to determine the most frequently occurring value in an array, and this error suggests that multiple values have the same highest frequency.

### EmptyArray

This error occurs when trying to apply the mode reducer on an empty array. The mode reducer requires at least one value in the array to determine the most frequently occurring value.

### WrongArguments

This error occurs when the given arguments are not valid for the given operator. It suggests that the provided arguments do not meet the requirements or expectations of the specified operator.

### HttpStatus

This error occurs when the HTTP response was an error code. It suggests that the HTTP request encountered an issue and the server responded with an error status.

### HttpOther

This error occurs when there is a failure to execute an HTTP request. It suggests that the HTTP request could not be completed successfully for reasons other than an error status.

### ParseFloat

This error occurs when there is a failure to convert a string to a float. It suggests that the provided string does not represent a valid floating-point number.

### ParseInt

This error occurs when there is a failure to convert a string to an integer. It suggests that the provided string does not represent a valid integer number.

### ParseBool

This error occurs when there is a failure to convert a string to a boolean value. It suggests that the provided string does not represent a valid boolean value.

### Overflow

This error occurs when a mathematical operator causes an overflow. It suggests that the result of the operation exceeds the maximum value that can be represented.

### MismatchingTypes

This error occurs when there are mismatching types. It suggests that the expected and actual data types do not match or are incompatible for a particular operation.

### DifferentSizeArrays

This error occurs when arrays to be reduced have different sizes. It suggests that the arrays being operated on should have the same size or length for the operation to be valid.

### BadSubscriptFormat

This error occurs when subscripts have an incorrect or invalid format. It suggests that the provided subscript should be in a specific format, but the format does not match the expected structure.

### Subscript

This error occurs when there is an error while executing a subscript. It suggests that there was a problem with the execution of the subscript operation.

### UrlParseError

This error occurs when there is an error while parsing a retrieval URL. It suggests that the provided URL is not valid or could not be parsed correctly.

### RetrieveTimeout

This error occurs when a timeout occurs during the retrieval phase. It suggests that the retrieval process took too long to complete, and a timeout mechanism was triggered.

### InvalidScript

This error occurs when an invalid script is encountered. It suggests that the provided script does not conform to the expected syntax or structure.

### EncodeRadonErrorArguments

This error occurs when there is a failure to encode `RadonError` arguments. It suggests that the arguments of a `RadonError` object could not be successfully encoded.

### DecodeRadonErrorNotArray

This error occurs when an alleged RadonError is actually not an instance of `cbor::value::Value::Array`. It suggests that the provided object, which was expected to be a RadonError, does not match the expected data structure.

### DecodeRadonErrorEmptyArray

This error occurs when an alleged RadonError is actually an empty `cbor::value::Value::Array`. It suggests that the provided RadonError object is empty and does not contain any valid data.

### DecodeRadonErrorBadCode

This error occurs when an alleged RadonError contains an error code that is not u8 (unsigned 8-bit integer). It suggests that the error code within the RadonError object does not match the expected data type.

### DecodeRadonErrorUnknownCode

This error occurs when an alleged RadonError contains an unknown error code. It suggests that the error code within the RadonError object is not recognized or supported.

### DecodeRadonErrorMissingArguments

This error occurs when an alleged RadonError does not have any arguments. It suggests that the RadonError object does not contain the expected arguments.

### DecodeRadonErrorWrongArguments

This error occurs when an alleged RadonError does not have the expected arguments. It suggests that the provided RadonError object does not match the expected data structure or contains incorrect argument values.

### DecodeRadonErrorArgumentsRadonTypesFail

This error occurs when an alleged RadonError has a RadonTypes argument that was wrongly serialized. It suggests that the RadonTypes argument within the RadonError object was not serialized correctly and does not match the expected format.

### InsufficientCommits

This error occurs when not enough commits are received. It suggests that the expected commits were not received or provided.

### NoReveals

This error occurs when no reveals are received. It suggests that the expected reveals were not received or provided.

### InsufficientConsensus

This error occurs when there is insufficient consensus in the tally precondition clause. It suggests that the required consensus for the tally precondition clause was not met.

### RequestTooManySources

This error occurs when the number of sources in a request exceeds the maximum allowed. It suggests that the request includes more sources than what is allowed or supported.

### ScriptTooManyCalls

This error occurs when a script contains too many function calls. It suggests that the script has exceeded the maximum allowed number of function calls.

### SourceScriptNotCBOR

This error occurs when at least one of the source scripts is not a valid CBOR-encoded value. CBOR (Concise Binary Object Representation) is a binary data format, and this error suggests that one or more of the source scripts provided in the CBOR format are not properly encoded.

### SourceScriptNotArray

This error occurs when the CBOR value decoded from a source script is not an Array. It suggests that the decoded value does not match the expected data structure, and it should have been an Array but is of a different type.

### SourceScriptNotRADON

This error occurs when the Array value decoded from a source script is not a valid RADON script.

### Underflow

This error occurs when a mathematical operator causes an underflow. Underflow happens when the result of a mathematical operation is too small to be represented accurately. For example, subtracting a very large number from another large number may result in underflow if the result is smaller than the minimum representable value.

### DivisionByZero

This error occurs when attempting to divide by zero. Division by zero is mathematically undefined and not supported. It suggests that there was an attempt to perform a division operation where the divisor (the number being divided by) is zero.

### EncodeRadonErrorUnknownCode

This error occurs when a RadError cannot be converted to RadonError because the error code is not defined. It suggests that the error code used in the RadError object does not match any known or defined error codes in the RadonError system.

### TallyExecution

This error occurs during tally execution and represents a generic error. It suggests that an error occurred during the execution of a tally, but the specific cause or nature of the error is not specified.

### UnhandledIntercept

This error occurs when a RadError cannot be converted to RadonError, even though it should be, because it is needed for the tally result. It suggests that there is an unhandled interception or error condition that should have been converted to a RadonError for proper handling but was not.

### UnhandledInterceptV2

Similar to UnhandledIntercept, this error occurs when a RadError cannot be converted to RadonError, but it should be, for the tally result. It indicates an unhandled interception or error condition that should have been properly converted but was not.

### MalformedReveal

This error occurs when there is invalid reveal serialization. Reveal serialization refers to the process of converting a reveal object into a specific format for transmission or storage. The error suggests that the reveal object's serialization is invalid, indicating a problem with the serialization process.

### EncodeReveal

This error occurs when there is a failure to encode a reveal object. Encoding a reveal involves converting it into a specific format, and this error suggests that the encoding process failed for some reason.

### InvalidHttpHeader

This error occurs when there is an error while parsing an HTTP header. HTTP headers contain additional information associated with an HTTP request or response, and this error suggests that there was a problem parsing or interpreting the contents of the header.

### InconsistentSource

This error occurs when a source appears inconsistent when queried through multiple transports simultaneously. It suggests that querying the source using different communication methods or transports leads to conflicting or inconsistent results, indicating a potential inconsistency or synchronization issue with the source data.
