# FOOD PRODUCTS
Platform to gather information about all the Food Products

## Screenshots

### Home Page
![Home_Page_1](https://github.com/user-attachments/assets/78251af5-fa6d-4b77-a05f-743c19ec8eb8)

### Strawberry Search
![Home_Page_2](https://github.com/user-attachments/assets/04ef8a05-df57-455d-9e30-7af57575d583)

### Infinite Loading
![Infinte_Loading](https://github.com/user-attachments/assets/5dbaf9f9-9489-4648-9938-b78186731662)

### Filters 
![Filter_Option](https://github.com/user-attachments/assets/6b27c937-b87d-4632-8d02-abebb844742b)

### Product Pages
![Product_Page_1](https://github.com/user-attachments/assets/d93ba11f-679e-42f2-a928-54ced4fdd5d3)
![Product_Page_2](https://github.com/user-attachments/assets/19d7b39b-dac2-4e38-aea1-049f4d071516)
![Product_Page_3](https://github.com/user-attachments/assets/44470416-6338-40a7-86c6-26ac803ce0ca)

### Barcode Search
![Search_By_Barcode](https://github.com/user-attachments/assets/6b767305-0665-4ef9-b6a3-e81757c5b2a4)



## Methodology

### Architecture Design
I chose a modular component-based architecture with:
- **Main Layout**: Header + Footer wrapper
- **Product Context**: Central state management for filters/search results
- **API Service Layer**: Isolated API calls to Open Food Facts
- **UI Components**: Reusable, self-contained components

### Key Implementation Steps

1. **API Integration**
   - Created an axios-based service (`lib/api.ts`) to handle all Open Food Facts API calls
   - Implemented proper error handling and data formatting
   - Added helper functions to normalize inconsistent API responses

2. **State Management**
   - Used React Context API to manage:
     - Product list and pagination
     - Active filters/sort options
     - Loading/error states
   - Implemented derived state to avoid unnecessary re-renders

3. **Infinite Scroll**
   - Created a custom hook (`useInfiniteScroll`) using Intersection Observer
   - Combined with pagination from the API
   - Added deduplication logic since the API sometimes returns duplicates

4. **Search & Filters**
   - Unified search handling for both text queries and barcodes
   - Implemented debouncing for search input
   - Designed category filter to show popular categories first
   - Made filter changes reset pagination properly

5. **Performance Optimizations**
   - Added loading states and skeleton placeholders
   - Implemented client-side data caching
   - Used dynamic imports for heavier components
   - Optimized re-renders with proper memoization

### Challenges & Solutions
1. **API Limitations**  
   The Open Food Facts API has inconsistent data formats. Solved by:
   - Creating robust data formatters (`lib/helpers.ts`)
   - Adding multiple fallbacks for missing fields
   - Implementing client-side data validation

2. **Filter State Management**  
   Combining filters with infinite scroll was tricky. Solved by:
   - Resetting pagination when filters change
   - Maintaining scroll position after navigation
   - Implementing a clean "reset filters" flow

3. **Barcode Handling**  
   Added special detection for barcode inputs that:
   - Validates barcode format client-side
   - Attempts direct product fetch before falling back to search
   - Provides clear user feedback

### Testing Approach
- Manual testing of all core flows
- Edge case testing (empty states, API errors)
- Mobile responsiveness checks
- Cross-browser testing (Chrome, Firefox, Safari)


## Time Taken

Overall 3 days took to complete this project
