interface SearchQueryService {
    query(expression: String, fieldName: String, fieldType: String): object
  }
  
  declare var mongoSearch: SearchQueryService;