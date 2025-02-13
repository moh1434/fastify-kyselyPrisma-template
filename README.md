-- you can switch dependencies from `dynamicDependenciesToAdd` variable inside `di-autoload.generator.ts` file, you may use process.env inside it also.
<br />
<br />
-- Example about Command Query Separation(CQS) principle:

<pre>
  billing/
    └ useCases/
      └ commands/
          chargeCustomer.command
          refundCustomer.command
      └ queries/ 
          getCustomerById.query
          getAllCustomers.query
          getCharges.query
        
  trading/
    └ useCases/
        └ commands/
            approveOffer.command
            makeOffer.command
            rejectOffer.command
        └ queries/
            getAllOffers.query
      
  catalog/
    └ useCases/
    └ commands/
          addVinyl.command
          updateVinyl.command
          removeVinyl.command
      └ queries/
          getVinylById.query
          getAllVinyl.query
          search.query
</pre>

--

<pre>
useful links about the about Command Query Separation(CQS):
1) https://khalilstemmler.com/articles/oop-design-principles/command-query-separation/
2) https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-use-cases/
</pre>