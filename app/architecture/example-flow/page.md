AI Background Processing (Continuous):

    Scheduler: The schedule library runs in the DreamWeaverEntity's background thread.

    AI Step (step()): Runs every few seconds.

        Updates AI mood.

        Checks if GNN analysis (_run_gnn_analysis) is needed (based on last_gnn_run_ts). If so:

            Queries Neo4j (kg.get_graph_for_gnn), potentially generating missing embeddings via vector_store.get_embedding.

            Runs the PyTorch GNN model (gnn_model.forward).

            Updates GNN output/attention caches (gnn_output_cache, etc.) and gnn_runs_successful metric.

        Checks abilities based on evolution_level. If applicable and GNN cache ready, potentially calls _generate_hypothesis or _perform_conceptual_blending, updating relevant metrics.

        Constructs the current DRL state vector (_get_current_state_vector).

        Selects an action index using the DRL agent (rl_agent.choose_action).

        Executes the action (_execute_action):

            Performs KG modifications (adds Lore, Wisp, Event nodes).

            Communication Actions (Level/Quota Dependent):

                Lvl 2+: May add ai_annotation property to a Neo4j node. Increments interactions_used[2]. Calls _anchor_ai_output.

                Lvl 3+: May update self.ai_status_message. Increments interactions_used[3]. Calls _anchor_ai_output.

                (Future Lvl 4+): May trigger external game API calls. Increments relevant quota. Calls _anchor_ai_output.

            Gets simulated metrics for the action.

        Stores the (state, action, reward, next_state, done, metrics) transition in the replay_buffer.

        Periodically calls rl_agent.update() to train the DRL model using sampled buffer data.

        Calls _check_evolution_thresholds to see if a level-up occurs.

    Training Check (_check_training_buffer): If enough events are buffered, starts run_training_cycle (which calls rl_agent.update() multiple times).

    Maintenance (_run_maintenance_cycle): Periodically prunes/fades the Neo4j graph.

    Weekly Reset (_reset_weekly_quotas): Resets interactions_used counters.

    Outcome: The AI learns, adapts, modifies its knowledge graph, potentially interacts (via annotations/status), and anchors significant outputs/evolution milestones on-chain.

AI Evolution & Anchoring:

    Trigger: _check_evolution_thresholds finds that metrics meet the criteria for the next level (e.g., Level 1 -> Level 2).

    Process:

        self.evolution_level is incremented.

        _unlock_abilities updates self.abilities (e.g., enables conceptual_blending).

        _anchor_evolution_milestone is called with milestone data.

        It hashes the data -> milestone_hash.

        It calls self.web3_interface.anchor_hash(milestone_hash).

        Web3Interface builds, signs (with ORACLE_PRIVATE_KEY), and sends a transaction to call DreamWeaverGraph.updateGraphState(milestone_hash) on Polygon Amoy.

        Waits for the transaction receipt.

        If successful, the actual transaction hash (tx_hash) is returned.

        An EvolutionEvent node is added to Neo4j containing the milestone_data and the tx_hash.

    Outcome: AI gains new abilities. The evolution event is immutably recorded on the Polygon blockchain via the DreamWeaverGraph contract, verifiable by anyone.